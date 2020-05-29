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
}