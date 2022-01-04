import { CGFobject } from '../lib/CGF.js';
/**
 * MyParallelogram
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyParallelogram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            0, 0, 0, // 0
            2, 0, 0, // 1
            1, 1, 0, // 2
            3, 1, 0,  // 3
        ];
        this.vertices = this.vertices.concat(this.vertices);

        //Counter-clockwise reference of vertices
        this.indices = [
            0,1,3,
            0,3,2,

            7,5,4,
            6,7,4
        ];

        this.normals = new Array(4).fill([0, 0, 1]).flat();
        this.normals = this.normals.concat(new Array(4).fill([0, 0, -1]).flat());

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}