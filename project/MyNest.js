import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { euclideanDistance, toRads } from './utilities/algebra.js';
import { MyPyramid } from './MyPyramid.js';
import { MyRock } from './MyRock.js';

export class MyNest extends CGFobject {
    constructor(scene, radius, posX, posZ) {
        super(scene);
        this.posX = posX;
        this.posZ = posZ;
        this.radius = radius;
        this.extraRocks = [];
        this.initNest();
    }

    initNest() {
        this.elements = [];

        const algaeAppearance = new CGFappearance(this.scene);
        algaeAppearance.setAmbient(1.0, 0.32, 0.18, 1.0);
        algaeAppearance.setDiffuse(1.0, 0.32, 0.18, 1.0);
        algaeAppearance.setSpecular(1.0, 0.32, 0.18, 1.0);
        algaeAppearance.setShininess(5);

        for (let i = 0; i < 360; i += 16) {
            this.elements.push({
                object: new MyPyramid(this.scene, 20, 20),
                x: Math.cos(toRads(i)) * this.radius,
                z: Math.sin(toRads(i)) * this.radius,
                scaleX: 0.5,
                scaleZ: 0.5,
                scaleY: 1.6,
                texture: algaeAppearance
            });
        }

        const eggAppearance = new CGFappearance(this.scene);
        eggAppearance.setAmbient(0.8, 0.45, 0.05, 1.0);
        eggAppearance.setDiffuse(0.8, 0.45, 0.05, 1.0);
        eggAppearance.setSpecular(0.8, 0.45, 0.05, 1.0);
        eggAppearance.setShininess(5);

        for (let theta = 0; theta < 2*Math.PI; theta += Math.PI / 4)
            for (let i = 1; i < this.radius; ++i)
                this.elements.push({
                    object: new MyRock(this.scene, 16, 8),
                    x: Math.cos(theta) * i,
                    z: Math.sin(theta) * i,
                    scaleX: 0.2,
                    scaleY: 0.2,
                    scaleZ: i * 0.1,
                    texture: eggAppearance
                });
    }

    addRock(fish) {
        if (euclideanDistance(fish.position[0], fish.position[2], this.posX, this.posZ) > this.radius)
            return;

        const rock = fish.object.rock;
        rock.posX = Math.random() * 2 * this.radius - this.radius;

        const maxZ = Math.sqrt(this.radius ** 2 - rock.posX**2);
        rock.posZ = Math.random() * 2 * maxZ - maxZ;
        rock.posY = 0;

        this.extraRocks.push(rock);
        delete fish.object.rock;
    }

    display() {
        this.scene.translate(this.posX, 0, this.posZ);
        this.scene.pushMatrix();

        this.elements.forEach(element => {
            this.scene.translate(element.x, 0, element.z);
            this.scene.scale(element.scaleX, element.scaleY, element.scaleZ);
            element.texture.apply();
            element.object.display();
            this.scene.popMatrix();
            this.scene.pushMatrix();
        });

        this.extraRocks.forEach(rock => {
            rock.material.apply();
            
            this.scene.translate(rock.posX, rock.posY, rock.posZ);
            this.scene.scale(rock.scaleX, rock.scaleY, rock.scaleZ);
            this.scene.rotate(rock.orientation, 0, 1, 0);
            rock.object.display();

            this.scene.popMatrix();
            this.scene.pushMatrix();
        });
        
        this.scene.defaultAppearance.apply();

        this.scene.popMatrix();
        this.scene.translate(-this.posX, 0, -this.posZ);
        this.scene.pushMatrix();
    }
}
