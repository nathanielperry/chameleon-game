import Phaser from 'phaser';

export default class Door extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 3460, 1280, 'door', 0);
        scene.add.existing(this);

        this.height = 143;
        this.width = 112;

        this.setOrigin(0, 0);
        this.setAlpha(0);
    }

    static load(scene, key, filename) {
        scene.load.spritesheet(key, filename, {
            frameWidth: 112, frameHeight: 143
        });
    }

    appear() {
        this.setAlpha(1);
    }

    dissappear() {
        this.setAlpha(0);
    }
}