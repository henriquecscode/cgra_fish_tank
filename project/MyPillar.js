import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';

export class MyPillar extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices around Y axis
   */
  constructor(scene, slices, height) {
    super(scene);
    this.cylinder = new MyCylinder(scene, slices);

    this.height = height;

    this.material = new CGFappearance(scene);
    this.material.setAmbient(1.0, 1.0, 1.0, 1.0);
    this.material.setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.material.setSpecular(1.0, 1.0, 1.0, 1.0);
    this.material.setShininess(5);

    // https://snappygoat.com/s/?q=bestof%3Atrunk+tree+wood+nature+tree+bark+bark+texture+branch
    this.material.loadTexture('./images/underwater/tree.jpeg');
  }

  display() {
    this.material.apply();

    this.scene.scale(1, this.height, 1);
    this.cylinder.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.scene.defaultAppearance.apply();
  }
}
