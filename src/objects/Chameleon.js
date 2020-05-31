import _ from 'underscore';

import Phaser from 'phaser';
import StateMachine from '../util/StateMachine';

export default class Chameleon extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, -64, 1280, 'idle', 0);
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.setCollideWorldBounds();

        this.height = 64;
        this.width = 64;

        this.body.setSize(this.width, this.height);
        
        //Properties
        this.skinColor = 0xffffff;
        this.targetSkinColor = 0xffffff;
        this.facing = 1;

        //Behaviour
        this.stateMachine = new StateMachine(this);
        this.stateMachine.setState(this.walk, 1);

        //Animations
        scene.anims.create({
            key: 'chameleon-walk',
            frames: scene.anims.generateFrameNumbers('chameleon-spritesheet', { start: 0, end: 3 }),
            frameRate: 3,
            repeat: -1,
        });
        scene.anims.create({
            key: 'chameleon-run',
            frames: scene.anims.generateFrameNumbers('chameleon-spritesheet', { start: 8, end: 11 }),
            frameRate: 5,
            repeat: -1,
        });

        scene.anims.create({
            key: 'chameleon-idle',
            frames: scene.anims.generateFrameNumbers('chameleon-spritesheet', { start: 4, end: 5 }),
            frameRate: 2,
            repeat: -1,
        });

        //Poses
        scene.anims.create({
            key: 'chameleon-wall-hug',
            frames: scene.anims.generateFrameNumbers('chameleon-spritesheet', { start: 6, end: 6}),
            frameRate: 2,
            repeat: -1,
        });
        scene.anims.create({
            key: 'chameleon-t-pose',
            frames: scene.anims.generateFrameNumbers('chameleon-spritesheet', { start: 7, end: 7}),
            frameRate: 2,
            repeat: -1,
        });

        //Event Listeners
        this.scene.events.on('chameleon-act', (a) => {
            this.stateMachine.setState(this[a.action], a.actionArgs);
        });
    }

    static load(scene) {
        scene.load.spritesheet('chameleon-spritesheet', 'chameleon-spritesheet.png', {
            frameWidth: 64, frameHeight: 64,
        });
    }

    update() {
        this.stateMachine.update();
    }

    setColor(hex) {
        const tint = parseInt(hex.slice(1), 16);
        this.setTint(tint);
        this.skinColor = tint;
    }

    getSkinColor() {
        return this.skinColor;
    }

    switchAnimation(key) {
        if (this.anims.getCurrentKey() !== key) {
            this.anims.play(key);
        }
    }

    //States
    walk(dir) {
        this.facing = dir || this.facing;
        this.switchAnimation('chameleon-walk');
        this.facing === 1 ? this.flipX = false : this.flipX = true;
        this.x += 1 * this.facing;
    }
    
    idle(facing) {
        this.switchAnimation('chameleon-idle');
    }

    pose(poseName) {
        const poses = [
            'chameleon-wall-hug',
            'chameleon-t-pose',
        ]

        this.switchAnimation(poseName || poses[_.random(poses.length - 1)]);
    }
}