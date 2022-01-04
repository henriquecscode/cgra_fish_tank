import { CGFobject, CGFtexture } from '../lib/CGF.js';
import { MyQuad } from "./MyQuad.js";
import { toRads } from "./utils.js"


/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject{
    constructor(scene, top, front, right, back, left, bot) {
        super(scene);
        this.init(top, front, right, back, left, bot);
    }

    init(top, front, right, back, left, bot) {
        this.quad = new MyQuad(this.scene);
        this.topTexture = top;
        this.frontTexture = front;
        this.rightTexture = right;
        this.backTexture = back;
        this.leftTexture = left;
        this.botTexture = bot;
    }

    display() {
        this.scene.pushMatrix();

        // Front face
        this.scene.translate(0, 0, 0.5);
        if (this.frontTexture) { // apply texture and display quad if defined
            this.frontTexture.bind();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
            this.quad.display();
        }

        // Right face
        this.scene.translate(0.5, 0, -0.5);
        this.scene.rotate(toRads(90), 0, 1, 0);
        if (this.rightTexture) {
            this.rightTexture.bind();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
            this.quad.display();
        }

        this.scene.popMatrix();
        this.scene.pushMatrix();

        // Left face
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(toRads(-90), 0, 1, 0);
        if (this.leftTexture) {
            this.leftTexture.bind();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
            this.quad.display();
        }

        this.scene.popMatrix();
        this.scene.pushMatrix();

        // Back face
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(toRads(180), 0, 1, 0);
        if (this.backTexture) {
            this.backTexture.bind();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
            this.quad.display();
        }

        this.scene.popMatrix();
        this.scene.pushMatrix();

        // Top face
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(toRads(-90), 1, 0, 0);
        if (this.topTexture) {
            this.topTexture.bind();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
            this.quad.display();
        }

        this.scene.popMatrix();
        this.scene.pushMatrix();

        // Bottom face
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(toRads(90), 1, 0, 0);
        if (this.botTexture) {
            this.botTexture.bind();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
            this.quad.display();
        }
    }
}
