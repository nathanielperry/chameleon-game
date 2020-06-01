import _ from 'underscore';

import Phaser from 'phaser';
import StateMachine from '../util/StateMachine';

export default class BadGuy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 120, 1280, 'idle', 0);
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.setCollideWorldBounds();

        this.height = 130;
        this.width = 120;

        this.body.setSize(this.width, this.height);
        
        //Properties
        this.facing = 1;

        //Behaviour
        this.stateMachine = new StateMachine(this);
        this.stateMachine.setState(this.idle, 1);

        //Animations
        scene.anims.create({
            key: 'badguy-idle',
            frames: scene.anims.generateFrameNumbers('badguy-spritesheet', { start: 0, end: 0 }),
            frameRate: 2,
            repeat: -1,
        });

        //Poses
        scene.anims.create({
            key: 'badguy-bug-eyed',
            frames: scene.anims.generateFrameNumbers('badguy-spritesheet', { start: 1, end: 1}),
            frameRate: 2,
            repeat: -1,
        });

        //Event Listeners
        this.scene.events.on('badguy-act', (a) => {
            this.stateMachine.setState(this[a.action], a.actionArgs);
        });
    }

    static load(scene) {
        scene.load.spritesheet('badguy-spritesheet', 'guy.png', {
            frameWidth: 120, frameHeight: 130,
        });
    }

    update() {
        this.stateMachine.update();
    }

    switchAnimation(key) {
        if (this.anims.getCurrentKey() !== key) {
            this.anims.play(key);
        }
    }

    changeFacing(dir) {
        dir === 1 ? this.flipX = false : this.flipX = true;
    }

    //States
    walk(dir) {
        this.switchAnimation('badguy-idle');
        this.changeFacing(dir);
        
        //No idea why I need +82 here but HEY
        if (this.y + 82 >= this.scene.bg.height) {
            //TODO: Play 'boink' sound here.
            this.scene.sound.play('boing');
            this.setVelocityX(20 * dir);
            this.setVelocityY(-40);
        }
    }

    run(dir) {
        this.switchAnimation('badguy-bug-eyed');
        this.changeFacing(dir);
        
        //No idea why I need +82 here but HEY
        if (this.y + 82 >= this.scene.bg.height) {
            this.scene.sound.play('boing');
            this.setVelocityX(175 * dir);
            this.setVelocityY(-50);
        }
    }
    
    idle(facing) {
        this.changeFacing(facing);
        this.switchAnimation('badguy-idle');

        this.setVelocityX(0);
        this.setVelocityY(0);
    }

    pose(poseName) {
        this.switchAnimation(`badguy-${poseName}`);
    }
}