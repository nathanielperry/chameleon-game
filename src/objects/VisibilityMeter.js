import Phaser from 'phaser';

export default class VisibilityMeter {
    width = 300;

    constructor(scene, x, y) {
        this.scene = scene;

        this.bar = new Phaser.GameObjects.Rectangle(scene, x, y, this.width, 15, 0xffffff, 120);
        this.bar.setOrigin(0, 0);
        scene.add.existing(this.bar);
    
        this.visibilityBar = new Phaser.GameObjects.Rectangle(scene, x, y, 0, 15, 0xffffff);
        this.visibilityBar.setOrigin(0, 0);
        scene.add.existing(this.visibilityBar);
    }

    fillBarTo(percentage) {
        this.visibilityBar.width = percentage * (this.width / 100);
    }
}