import { MyPillar } from "./MyPillar.js";

export class MyPier {
    constructor(scene, width, length, height, xPosition, yPosition, zPosition) {
        this.scene = scene;
        this.cyllinder = new MyPillar(scene, 20, height);

        this.length = length;
        this.width = width;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.zPosition = zPosition;
    }

    display() {
        this.scene.translate(this.xPosition, this.yPosition, this.zPosition);
        this.scene.pushMatrix();

        // FrontRight
        this.scene.translate(this.width/2,0,this.length/2);
        this.cyllinder.display();

        // BackRight
        this.scene.translate(this.width/2,0,-this.length/2);
        this.cyllinder.display();

        // FrontLeft
        this.scene.translate(-this.width/2,0,this.length/2);
        this.cyllinder.display();

        // BackLeft
        this.scene.translate(-this.width/2,0,-this.length/2);
        this.cyllinder.display();

        this.scene.popMatrix();
        this.scene.translate(-this.xPosition, -this.yPosition, -this.zPosition);
        this.scene.pushMatrix();
    }
}
