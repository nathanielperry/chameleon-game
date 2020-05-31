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
        this.percentage = 0;
        this.targetWidth = 0;
        this.hidden = false;
        
        this.add(this.bar);
        this.add(this.visibilityBar);
        this.setScrollFactor(0);

        scene.add.existing(this);
    }

    fillBarTo(percentage) {
        this.percentage = percentage;
        this.targetWidth = percentage * (this.width / 100);
    }

    update(delta) {
        this.visibilityBar.width = Phaser.Math.Interpolation.Linear(
            [this.visibilityBar.width, this.targetWidth],
            0.1
        );

        if (this.percentage <= 10) {
            this.visibilityBar.fillColor = 0x6abe30;
            if(!this.hidden) {
                this.hidden = true;
                this.scene.events.emit('hidden');
            }
        } else if (this.percentage < 50) {
            this.visibilityBar.fillColor = 0xe17e3b;
        } else {
            this.visibilityBar.fillColor = 0xac3232;
        }

        if (this.percentage > 10) {
            this.hidden = false;
        }
    }
}