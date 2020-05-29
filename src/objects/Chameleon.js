import Phaser from 'phaser';

export default class Chameleon extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 50, 215, 'chameleon');
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.setCollideWorldBounds();
        this.skinColor = 0xffffff;

        scene.anims.create({
            key: 'walk',
            frames: scene.anims.generateFrameNumbers('walk', { start: 0, end: 3 }),
            frameRate: 3,
            repeat: -1,
        });

        this.anims.play('walk');
    }

    static load(scene) {
        scene.load.spritesheet('walk', 'chameleon-walk.png', {
            frameWidth: 64, frameHeight: 32
        });

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