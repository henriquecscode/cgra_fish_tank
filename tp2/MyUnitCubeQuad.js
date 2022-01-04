import { CGFobject } from '../lib/CGF.js';
import { MyQuad } from "./MyQuad.js";
import { toRads } from "./utils.js"


/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject{
    constructor(scene) {
        super(scene);
        this.init();
    }

    init() {
        this.quad = new MyQuad(this.scene);
    }

    display() {
        this.scene.pushMatrix();

        // Top face
        this.scene.translate(0, 0, 0.5);
        this.quad.display();

        // Right face
        this.scene.translate(0.5, 0, -0.5);
        this.scene.rotate(toRads(90), 0, 1, 0);
        this.quad.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        // Left face
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(toRads(-90), 0, 1, 0);
        this.quad.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        // Back face
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(toRads(180), 0, 1, 0);
        this.quad.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        // Top face
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(toRads(-90), 1, 0, 0);
        this.quad.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        // Bottom face
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(toRads(90), 1, 0, 0);
        this.quad.display();
    }
}
