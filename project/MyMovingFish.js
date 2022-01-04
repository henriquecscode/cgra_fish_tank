import { MyFish } from './MyFish.js';
import { MyMovingObject } from './MyMovingObject.js';

export class MyMovingFish extends MyMovingObject {

    constructor(scene, minHeight, maxHeight) {
        super(scene, new MyFish(scene));
        this.minHeight = minHeight;
        this.maxHeight = maxHeight;
        this.reset();
    }

    update(t) {
        this.position[0] += this.scene.speedFactor * Math.sin(this.orientation) * this.velocity;
        this.position[1] += this.scene.speedFactor * this.verticalVelocity;

        if (this.position[1] < this.minHeight) {
            this.position[1] = this.minHeight;
        }

        if (this.position[1] > this.maxHeight) {
            this.position[1] = this.maxHeight;
        }
        
        this.position[2] += this.scene.speedFactor * Math.cos(this.orientation) * this.velocity;

        this.object.update(t, this.velocity, this.turnLeft, this.turnRight);
        this.turnLeft = false;
        this.turnRight = false;
    }

    ascend() {
        this.verticalVelocity = this.maxHeight / 100;
    }

    descend() {
        this.verticalVelocity = -this.maxHeight / 100;
    }

    reset() {
        super.reset();
        this.verticalVelocity = 0;
        this.position = [0, this.maxHeight / 2, 0];
        this.object.update(0, 0, 0, 0);
    }

    isOnLowerLimit() {
        return this.position[1] === this.minHeight;
    }

    display() {
        // Animate based on user input
        this.scene.translate(...this.position);
        this.scene.rotate(this.orientation, 0, 1, 0);

        this.object.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
    }
}
