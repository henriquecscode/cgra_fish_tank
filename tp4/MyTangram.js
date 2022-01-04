import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js"
import { MyTriangleSmall } from "./MyTriangleSmall.js";

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
  constructor(scene) {
    super(scene);
    this.init();
  }

  initMaterials() {
    // Tangram Material
    this.materialTangram = new CGFappearance(this.scene);
    this.materialTangram.setAmbient(0.1, 0.1, 0.1, 1);
    this.materialTangram.setDiffuse(0.9, 0.9, 0.9, 1);
    this.materialTangram.setSpecular(0.1, 0.1, 0.1, 1);
    this.materialTangram.setShininess(10.0);
    this.materialTangram.loadTexture('images/tangram.png');
    this.materialTangram.setTextureWrap('REPEAT', 'REPEAT');
  }

  init() {
    this.parallelogram = new MyParallelogram(this.scene);
    this.triangleUnder = new MyTriangle(this.scene);
    this.square = new MyDiamond(this.scene);
    this.triangleBesides = new MyTriangle(this.scene);
    this.mediumTriangle = new MyTriangleSmall(this.scene);
    this.bigTriangle = new MyTriangle(this.scene);
    this.roofTriangle = new MyTriangleSmall(this.scene);
    this.initMaterials();
  }

  enableNormalViz() {
    this.parallelogram.enableNormalViz();
    this.triangleUnder.enableNormalViz();
    this.square.enableNormalViz();
    this.triangleBesides.enableNormalViz();
    this.mediumTriangle.enableNormalViz();
    this.bigTriangle.enableNormalViz();
    this.roofTriangle.enableNormalViz();
  }

  disableNormalViz() {
    this.parallelogram.disableNormalViz();
    this.triangleUnder.disableNormalViz();
    this.square.disableNormalViz();
    this.triangleBesides.disableNormalViz();
    this.mediumTriangle.disableNormalViz();
    this.bigTriangle.disableNormalViz();
    this.roofTriangle.disableNormalViz();
  }

  display() {

    // ---- BEGIN Transformation matrices section

    this.materialTangram.apply(); // apply the tangram material
    this.scene.pushMatrix();

    // Matrix definitions

    const matrixScale = [
      1 / Math.sqrt(2), 0, 0, 0,
      0, 1 / Math.sqrt(2), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ];

    const angle1 = -45 * Math.PI / 180;
    const matrixRotateZ = [
      Math.cos(angle1), Math.sin(angle1), 0, 0,
      -Math.sin(angle1), Math.cos(angle1), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ];

    const matrixRotateX = [
      1, 0, 0, 0,
      0, Math.cos(Math.PI), Math.sin(Math.PI), 0,
      0, -Math.sin(Math.PI), Math.cos(Math.PI), 0,
      0, 0, 0, 1
    ];

    // Transformations (by reversed order)

    this.scene.multMatrix(matrixRotateZ);
    this.scene.multMatrix(matrixRotateX);
    this.scene.multMatrix(matrixScale);

    // ---- END Transformation matrices section

    // ---- BEGIN Primitive drawing section

    this.parallelogram.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    // Small triangle under parallelogram
    this.scene.translate(0.5, -1.5, 0);
    this.scene.scale(0.5, 0.5, 1);

    this.triangleUnder.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    // Square
    this.scene.translate(-0.5, -1.5, 0);

    this.scene.scale(1 / Math.sqrt(2), 1 / Math.sqrt(2), 1);

    const angSquare = 45 * Math.PI / 180;
    this.scene.rotate(angSquare, 0, 0, 1);

    this.square.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    // Small triangle besides the parallelogram
    this.scene.translate(-0.5, -0.5, 0);
    this.scene.scale(0.5, 0.5, 1);
    this.scene.rotate(Math.PI / 2, 0, 0, 1);

    this.triangleBesides.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    // Medium triangle
    this.scene.translate(-1, 0, 0);
    this.scene.rotate(-Math.PI / 2, 0, 0, 1);

    this.mediumTriangle.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    // Big Triangle
    this.scene.rotate(Math.PI, 0, 0, 1);

    this.bigTriangle.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    // Roof Triangle
    this.scene.translate(0, 1, 0);
    this.scene.scale(1.5, 1.5, 0);

    this.roofTriangle.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();

    // ---- END Primitive drawing section
  }
}