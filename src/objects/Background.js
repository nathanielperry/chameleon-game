import Phaser from 'phaser';

export default class Background extends Phaser.GameObjects.Image {
    constructor(scene, key,z) {
        super(scene, 0, 0, key);
        this.setOrigin(0, 0);
        this.setDepth(z);
        scene.add.existing(this);
    }

    static load(scene, key, filename) {
        scene.load.image(key, filename);
    }

    getHexColorOfPixelAt(x, y) {
        const pixel = this.scene.textures.getPixel(x - this.x, y, 'background') || { r: 0, g: 0, b: 0 };
        return pixel;
        // return rgbToHex(pixel.r, pixel.g, pixel.b);
    }
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
  
function rgbToHex(r, g, b) {
    return parseInt(componentToHex(r) + componentToHex(g) + componentToHex(b), 16);
}