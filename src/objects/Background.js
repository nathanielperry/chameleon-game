import Phaser from 'phaser';

export default class Chamelon extends Phaser.GameObjects.Image {
    constructor(scene) {
        super(scene, 0, 0, 'background');
        this.setOrigin(0, 0);
        scene.add.existing(this);
    }

    static load(scene) {
        scene.load.image('background', 'background.png');
    }

    update() {
        this.setPosition(this.x - 1, this.y);
    }

    getHexColorOfPixelAt(x, y) {
        const pixel = this.scene.textures.getPixel(x - this.x, y, 'background') || { r: 0, g: 0, b: 0 };
        return rgbToHex(pixel.r, pixel.g, pixel.b);
    }
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
  
function rgbToHex(r, g, b) {
    return parseInt(componentToHex(r) + componentToHex(g) + componentToHex(b), 16);
}