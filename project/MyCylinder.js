import {CGFobject} from '../lib/CGF.js';

export class MyCylinder extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices around Y axis
   */
  constructor(scene, slices) {
    super(scene);
    this.slices = slices;

    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    const deltaTheta = 2 * Math.PI / this.slices;
    for (let theta = 0, i = 0; i <= 2 * this.slices; theta += deltaTheta, i += 2) {
        // Vertices coordinates
        const x = Math.sin(theta);
        const z = Math.cos(theta);

        this.vertices.push(x, 0, z);
        this.vertices.push(x, 1, z);

        // Indices
        if (i < 2 * this.slices) {  // last slice does not need indices
          this.indices.push(i + 2, i + 1, i);
          this.indices.push(i + 1, i + 2, i + 3);
        }

        // Normals
        this.normals.push(x, 0, z);
        this.normals.push(x, 0, z);

        // Tex Coords
        this.texCoords.push(i / (2 * this.slices), 1);
        this.texCoords.push(i / (2 * this.slices), 0);
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
