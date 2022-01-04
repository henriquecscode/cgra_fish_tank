import { MyAlgaeFormation } from './MyAlgaeFormation.js';

export class MyFlora {
    static minX = -20;
    static maxX = 20;
    static minZ = -20;
    static maxZ = 20;
    constructor(scene, noFormations, nestStats) {
        this.scene = scene;
        this.noFormations = noFormations;
        this.nestStats = nestStats;
        this.formations = this.initFormations(noFormations);
    }

    initFormations(noFormations) {
        let formations = [];
        for (let i = 0; i < noFormations; i++) {
            let x = Math.floor(Math.random() * (MyFlora.maxX - MyFlora.minX) + MyFlora.minX);
            let z = Math.floor(Math.random() * (MyFlora.maxZ - MyFlora.minZ) + MyFlora.minZ);

            if (x >= this.nestStats.x - this.nestStats.r
                && x <= this.nestStats.x + this.nestStats.r
                && z >= this.nestStats.z - this.nestStats.r
                && z <= this.nestStats.z + this.nestStats.r)
                x += 2.1 * this.nestStats.r * Math.pow(-1, i);

            formations.push(new MyAlgaeFormation(this.scene, [x,0,z]));
        }
        return formations;
    }

    display(){
        this.formations.forEach(formation => {
            formation.display();
        });
    }
}
