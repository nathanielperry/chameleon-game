import Phaser from 'phaser';

export default class Chamelon extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 50, 224, 'chameleon');
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.setCollideWorldBounds();
        this.skinColor = 0xffffff;
    }

    static load(scene) {
        scene.load.image('chameleon', 'chameleon.png');
    }

    setColor(hex) {
        const tint = parseInt(hex.slice(1), 16);
        this.setTint(tint);
        this.skinColor = tint;
    }

    getSkinColor() {
        return this.skinColor;
    }
}