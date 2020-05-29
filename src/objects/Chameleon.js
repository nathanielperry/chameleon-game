import Phaser from 'phaser';

export default class Chamelon extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 50, 224, 'chameleon');
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.setCollideWorldBounds();
    }

    static load(scene) {
        scene.load.image('chameleon', 'chameleon.png');
    }
}