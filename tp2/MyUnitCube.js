import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, -0.5, // 0
            -0.5, -0.5, 0.5,  // 1
            -0.5, 0.5, -0.5,  // 2
            -0.5, 0.5, 0.5,   // 3
            0.5, -0.5, -0.5,  // 4
            0.5, 0.5, -0.5,   // 5
            0.5, -0.5, 0.5,   // 6
            0.5, 0.5, 0.5,    // 7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            // Front face
			7, 3, 1,
            7, 1, 6,
            // Right face
            7, 6, 4,
            7, 4, 5,
            // Left face
            0, 1, 3,
            0, 3, 2,
            // Back face
            4, 0, 2,
            4, 2, 5,
            // Top face
            3, 7, 2,
            7, 5, 2,
            // Bottom face
            1, 0, 6,
            0, 4, 6,
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

