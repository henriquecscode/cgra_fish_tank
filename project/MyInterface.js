import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();

        // Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'displayMyCubeMap').name('Display cube map');
        this.gui.add(this.scene, 'displayFloor').name('Display floor');
        this.gui.add(this.scene, 'displayFish').name('Display fish');
        this.gui.add(this.scene, 'displayRockSet').name('Display rock set');
        this.gui.add(this.scene, 'displayPier').name('Display pier');
        this.gui.add(this.scene, 'displayWaterSurface').name('Display water surface');
        this.gui.add(this.scene, 'displayNest').name('Display nest');
        this.gui.add(this.scene, 'displayFlora').name('Display flora');
        this.gui.add(this.scene, 'displayMyAnimatedFish').name('Display animated fish');
        
        // Dropdown for textures
        this.gui.add(this.scene, 'selectedTexture', this.scene.textureIds).name('Selected Texture').onChange(this.scene.updateMyCubeMapTexture.bind(this.scene));

        // Slider elements in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.5, 3).name('Scale Factor');
        this.gui.add(this.scene, 'speedFactor', 0.1, 3).name('Speed Factor').onChange(this.scene.updateSpeedFactor.bind(this.scene));

        this.initKeys();
        return true;
    }

    initKeys() {
        // create reference from the scene to the GUI
        this.scene.gui=this;

        // disable the processKeyboard function
        this.processKeyboard=function(){};

        // create a named array to store which keys are being pressed
        this.activeKeys={};
    };

    processKeyDown(event) {
        // called when a key is pressed down
        // mark it as active in the array
        this.activeKeys[event.code]=true;
    };

    processKeyUp(event) {
        // called when a key is released, mark it as inactive in the array
        this.activeKeys[event.code]=false;
    };

    isKeyPressed(keyCode) {
        if (this.activeKeys[keyCode] &&
                  (keyCode == "keyL" || keyCode == "keyP")) {
                    this.activeKeys[keyCode] = false;
                    return true;
          }  
          return this.activeKeys[keyCode] || false;
      }
}
