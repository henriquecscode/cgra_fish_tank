import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyRock } from './MyRock.js'
import { euclideanDistance } from './utilities/algebra.js';

export class MyRockSet extends CGFobject {

    constructor(scene, numRocks, radius, maxScale, minScale) {
        super(scene);
        this.radius = radius || 1;
        this.maxScale = maxScale || 0.2;
        this.minScale = minScale || 0.01;
        this.init(numRocks);
    }

    init(numRocks) {
        this.rockMaterial = new CGFappearance(this.scene);
        this.rockMaterial.setAmbient(0.05, 0.05, 0.05, 1.0);
        this.rockMaterial.setDiffuse(0.4, 0.4, 0.4, 1.0);
        this.rockMaterial.setSpecular(0.7, 0.7, 0.7, 1.0);
        this.rockMaterial.setShininess(20);

        this.rocks = [];
        for (let i = 0; i < numRocks; ++i) {
            const x = Math.random() * 2 * this.radius - this.radius;
            const maxZ = Math.sqrt(this.radius ** 2 - x**2);

            this.rocks.push({
                visible: true,
                orientation: Math.floor(Math.random() * Math.PI),
                posX: x,
                posY: 0,
                posZ: Math.random() * 2 * maxZ - maxZ,
                scaleX: Math.random() * (this.maxScale - this.minScale) + this.minScale,
                scaleY: Math.random() * (this.maxScale - this.minScale) + this.minScale,
                scaleZ: Math.random() * (this.maxScale - this.minScale) + this.minScale,
                object: new MyRock(this.scene, 16, 8)
            });
        }
    }

    takeClosestRock(posX, posZ) {
        let chosenRock = -1;
        let minDistance = null;
        for (let i = 0; i < this.rocks.length; ++i) {
            const rock = this.rocks[i];
            const distance = euclideanDistance(posX, posZ, rock.posX, rock.posZ);

            if (distance >= 1.5) continue;

            if (!minDistance || distance < minDistance) {
                chosenRock = i;
                minDistance = distance;
            }
        }
        if (chosenRock === -1) return null;

        this.rocks[chosenRock].visible = false;
        this.takenRock = chosenRock;

        // return a copy
        const returnableRock = this.rocks.slice()[chosenRock];
        returnableRock.material = this.rockMaterial;
        return returnableRock;
    }

    putRockBack() {
        if (!this.takenRock) return;
        this.rocks[this.takenRock].visible = true;
        delete this.takenRock;
    }

    display() {
        this.scene.pushMatrix();
        this.rockMaterial.apply();

        this.rocks.forEach(rock => {
            if (!rock.visible) return;
            this.scene.translate(rock.posX, rock.posY, rock.posZ);
            this.scene.scale(rock.scaleX, rock.scaleY, rock.scaleZ);
            this.scene.rotate(rock.orientation, 0, 1, 0);
            rock.object.display();

            this.scene.popMatrix();
            this.scene.pushMatrix();
        });

        this.scene.defaultAppearance.apply();
    }
}
