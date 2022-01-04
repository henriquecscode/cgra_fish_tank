import { CGFobject } from '../lib/CGF.js';

/**
 * MyTriangleSmall
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangleSmall extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}

	initBuffers() {
		this.vertices = [
			-1, 0, 0, // 0
			1, 0, 0,  // 1
			0, 1, 0,   // 2
		];
		this.vertices = this.vertices.concat(this.vertices);

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			5, 4, 3
		];

		this.normals = new Array(3).fill([0, 0, 1]).flat();
		this.normals = this.normals.concat(new Array(3).fill([0, 0, -1]).flat());

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

