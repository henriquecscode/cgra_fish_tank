import { CGFappearance, CGFtexture, CGFshader, CGFobject } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";


export class MyWaterSurface extends CGFobject{
    firstTime;
    constructor(scene, size){
        super(scene);
        this.waterSurf = new MyPlane(scene, 100);

        this.scene = scene;
        this.size = size;
        
        this.waterShader = new CGFshader(this.scene.gl, "shaders/water.vert", "shaders/water.frag");
        this.waterShader.setUniformsValues({ timeFactor: 0, uSampler2: 1, distortionScale: 0.3 });
        this.waterTexture = new CGFtexture(this.scene, './images/underwater/pier.jpg');
        this.waterDistortionTexture = new CGFtexture(this.scene, './images/underwater/distortionmap.png');

        this.materials = new CGFappearance(this);
        this.materials.setAmbient(1.0,1.0,1.0,1.0);
        this.materials.setDiffuse(1.0,1.0,1.0,1.0);
        this.materials.setSpecular(1.0,1.0,1.0,1.0);
        this.materials.setShininess(120);
    }

    update(t){
        this.firstTime = this.firstTime || t;
        t = t - this.firstTime;
        this.waterShader.setUniformsValues({timeFactor: t / 100 });
    }

    resetFirstTime(){
        this.firstTime = undefined;
    }

    display(){
        this.scene.scale(this.size, this.size, this.size);
        this.scene.rotate(Math.PI/2, 1, 0, 0);

        this.waterTexture.bind();
        this.waterDistortionTexture.bind(1);
        this.scene.setActiveShader(this.waterShader);

        this.waterSurf.display();

        this.scene.setActiveShader(this.scene.defaultShader);

        this.scene.popMatrix();
        this.scene.pushMatrix();
    }
}
