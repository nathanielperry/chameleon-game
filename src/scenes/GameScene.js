import _ from 'underscore';

import Phaser from 'phaser';
import Chameleon from '../objects/Chameleon';
import BadGuy from '../objects/BadGuy';

import Background from '../objects/Background';
import TextInput from '../objects/TextInput';
import VisibilityMeter from '../objects/VisibilityMeter';

import LevelSequencer from '../util/LevelSequencer';
import colorData from '../lib/colors';
import sequence from '../lib/sequence';
import Door from '../objects/Door';

export default class GameScene extends Phaser.Scene
{
	constructor() {
		super('game-scene');
	}

	preload() {
        const scene = this;

        Chameleon.load(scene);
        BadGuy.load(scene);
        Background.load(scene, 'background', 'background.png');
        Background.load(scene, 'midground', 'background-m.png');
        Door.load(scene, 'door', 'door.png');
        const colorListElem = document.querySelector('#color-list');
        colorData.forEach((color) => {
            addColorData(color.name, colorListElem);
        });

        this.load.audio('horrible', 'Horrible_Noise.wav');
        this.load.audio('dog', 'BARK_BARK_BARK.mp3');
        this.load.audio('door-open', 'open-aim.mp3');
        this.load.audio('door-close', 'exit-aim.mp3');
        this.load.audio('boing', 'boing2.mp3');
        this.load.audio('crickets', 'crickets.mp3');
    }

    create() {
        const scene = this;
        const cam = this.cameras.main;

        this.sequencer = new LevelSequencer(scene, sequence);
        this.saveStates = {};
        this.lastCheckpoint = '';

        //background, camera, and world
        this.bg = new Background(scene, 'background', 0);
        this.mg = new Background(scene, 'midground', 2);
        this.music = scene.sound.add('crickets');
        this.music.play({
            loop: true,
        });

        //Not sure why we need to raise it 32 pixels here
        this.physics.world.setBounds(0, 0, this.bg.width, this.bg.height-16);
        cam.setBounds(0, 0, this.bg.width, this.bg.height);
        cam.scrollX = 175;
        cam.scrollY = this.bg.height - 160;

        //UI
        this.visibilityMeter = new VisibilityMeter(scene, 10, 10);
        this.text = new TextInput(scene);

        //Actors
        this.player = new Chameleon(scene);
        this.player.setColor('#ff0040');
        this.player.setDepth(3);

        this.badguy = new BadGuy(scene);
        this.badguy.setDepth(1);

        this.door = new Door(scene);
        this.door.setDepth(1);

        //On color-change event, change color of chameleon
        this.events.on('color-change', (colorName) => {
            const color = colorData.find(c => {
                return c.name.toLowerCase() === colorName.toLowerCase();
            });

            if (!color) return;
            this.player.setColor(color.hex);
        });

        this.sequencer.go();
    }

    update() {
        this.visibilityMeter.fillBarTo(this.getChameleonVisibility());
        this.player.update();
        this.badguy.update();
        this.visibilityMeter.update();
    }

    getColorBehindChameleon() {
        return this.bg.getHexColorOfPixelAt(
            this.player.getCenter().x,
            this.player.getCenter().y,
        );
    }

    getChameleonVisibility() {
        const maxVisibility = 255 * 3;
        const rgbBehind = this.getColorBehindChameleon();
        const rgbSkinColor = hexToRgb(this.player.getSkinColor());
        const colorDiff = ['r', 'g', 'b'].reduce((diff, cur) => {
            return diff + Math.abs(rgbBehind[cur] - rgbSkinColor[cur]);
        }, 0);

        return (colorDiff / maxVisibility) * 100;
    }

    saveState(checkpointName) {
        if (this.saveStates[checkpointName]) return;
        this.saveStates[checkpointName] = {
            chameleonLoc: [this.player.x, this.player.y],
            badguyLoc: [this.badguy.x, this.player.y],
            cameraLoc: [this.cameras.main.x, this.cameras.main.y],
            sequenceStep: this.sequencer.currentStep,
        }

        this.lastCheckpoint = checkpointName;
    }

    loadState(checkpointName) {
        const { chameleonLoc, badguyLoc, cameraLoc, sequenceStep } = this.saveStates[checkpointName];
        this.player.setPosition(chameleonLoc[0], chameleonLoc[1]);
        this.badguy.setPosition(badguyLoc[0], badguyLoc[1]);
        this.cameras.main.setPosition(cameraLoc[0], cameraLoc[1]);
        this.sequencer.currentStep = sequenceStep;

        this.sequencer.restart();
        this.sequencer.go(sequenceStep);
    }

    gameOver() {
        const cam = this.cameras.main;
        this.badguy.stateMachine.setState(this.badguy.pose, 'bug-eyed');
        this.lastCheckpoint === 'dog' ? this.sound.play('dog') : this.sound.play('horrible');
        setTimeout(() => {
            this.text.input.value = '';
            this.text.writeToTextInput('', 1);
            this.text.writeToTextInput('Game Over', 2000);
            cam.fade(2000, 0, 0, 0);
            setTimeout(() => {
                this.lastCheckpoint === 'house' ? this.badguy.setAlpha(0) : null ;
                this.badguy.stateMachine.setState(this.badguy.pose, 'idle');
                this.loadState(this.lastCheckpoint);
                cam.fadeIn(2000, 0, 0, 0);
                this.text.writeToTextInput('', 1);
            }, 5000);
        }, 3000);
    }
}

const addColorData = function(name, target) {
    const option = document.createElement('option');
    option.innerText = name;
    target.append(option);
}

const hexToRgb = function(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
