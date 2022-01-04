import { MyAlga } from './MyAlga.js';

export class MyAlgaeFormation {

    static maxAlgae = 10;
    static maxRadius = 1;
    constructor(scene, pos) {
        this.scene = scene;
        this.pos = pos;
        this.initAlgae();
    }

    initAlgae() {
        this.noAlgae = Math.floor(Math.random() * MyAlgaeFormation.maxAlgae) + 1;

        this.algae = [];
        this.algaePos = [];
        for (let i = 0; i < this.noAlgae; i++) {
            this.algae.push(new MyAlga(this.scene));
            let radius = Math.random() * MyAlgaeFormation.maxRadius;
            let angle = Math.random() * 2*Math.PI;
            this.algaePos.push([radius*Math.cos(angle), radius*Math.sin(angle)]);
        }
    }

    display(){
        this.scene.translate(...this.pos);
        this.scene.pushMatrix();
        for(let i = 0; i < this.noAlgae; i++){
            let alga = this.algae[i];
            let algaPos = this.algaePos[i];
            this.scene.translate(algaPos[0], 0, algaPos[1]);
            alga.display();
            this.scene.popMatrix();
            this.scene.pushMatrix()
        }
        this.scene.popMatrix();
        
        this.scene.popMatrix();
        this.scene.pushMatrix();
    }
}
