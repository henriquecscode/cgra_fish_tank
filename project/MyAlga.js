import { MyPyramid } from './MyPyramid.js'
import { CGFappearance } from '../lib/CGF.js';

export class MyAlga{

    constructor(scene){
        this.scene = scene;
        this.alga = new MyPyramid(scene, 10, 10);
        this.initColor();
        this.initSize();
    }

    initColor(){
        let devR = Math.random() * 0.2;
        let devG = Math.random() * 0.2;
        let devB = Math.random() * 0.2;
        this.algaeAppearance = new CGFappearance(this.scene);
        this.algaeAppearance.setAmbient(0.33 + devR, 0.50 + devG, 0.45 + devB, 1.0);
        this.algaeAppearance.setDiffuse(0.33 + devR, 0.50 + devG, 0.45 + devB, 1.0);
        this.algaeAppearance.setSpecular(0.33 + devR, 0.50 + devG, 0.45 + devB, 1.0);
        this.algaeAppearance.setEmission(0, 0, 0, 1);
        this.algaeAppearance.setShininess(5);
    }

    initSize(){
        this.height = Math.random() * 2 + 0.5;
        this.radius = Math.random() * 0.2 + 0.05;
    }

    display(){

        this.scene.scale(this.radius, this.height, this.radius);
        this.algaeAppearance.apply();
        this.alga.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
    }
}