import Phaser from 'phaser';

export default class VisibilityMeter extends Phaser.GameObjects.Container {
    width = 300;

    constructor(scene, x, y) {
        super(scene);
        this.scene = scene;

        this.bar = new Phaser.GameObjects.Rectangle(scene, x, y, this.width, 15, 0xffffff, 120);
        this.visibilityBar = new Phaser.GameObjects.Rectangle(scene, x, y, 0, 15, 0xffffff);

        this.bar.setOrigin(0, 0);
        this.visibilityBar.setOrigin(0, 0);
        
        this.add(this.bar);
        this.add(this.visibilityBar);
        this.setScrollFactor(0);

        scene.add.existing(this);
    }

    fillBarTo(percentage) {
        this.visibilityBar.width = percentage * (this.width / 100);
    }
}