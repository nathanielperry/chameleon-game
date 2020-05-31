import _ from 'underscore';

import Phaser from 'phaser';
import Chameleon from '../objects/Chameleon';
import BadGuy from '../objects/BadGuy';

import Background from '../objects/Background';
import TextBox from '../objects/TextBox';
import TextInput from '../objects/TextInput';
import VisibilityMeter from '../objects/VisibilityMeter';

import LevelSequencer from '../util/LevelSequencer';
import colorData from '../lib/colors';
import sequence from '../lib/sequence';

export default class GameScene extends Phaser.Scene
{
	constructor() {
		super('game-scene');
	}

	preload() {
        const scene = this;

        Chameleon.load(scene);
        BadGuy.load(scene);
        Background.load(scene);
        const colorListElem = document.querySelector('#color-list');
        colorData.forEach((color) => {
            addColorData(color.name, colorListElem);
        });
    }

    create() {
        const scene = this;
        const cam = this.cameras.main;

        this.sequencer = new LevelSequencer(scene, sequence);

        //background, camera, and world
        this.bg = new Background(scene);
        //Not sure why we need to raise it 32 pixels here
        this.physics.world.setBounds(0, 0, this.bg.width, this.bg.height);
        // cam.setBounds(0, 0, this.bg.width, this.bg.height);
        cam.scrollX = 64;
        cam.scrollY = this.bg.height - 160;

        //UI
        this.visibilityMeter = new VisibilityMeter(scene, 10, 10);
        this.text = new TextInput(scene);

        //Actors
        this.player = new Chameleon(scene);
        this.player.setColor('#ac3232');

        this.badguy = new BadGuy(scene);

        //On color-change event, change color of chameleon
        this.events.on('color-change', (colorName) => {
            const color = colorData.find(c => {
                return c.name.toLowerCase() === colorName.toLowerCase();
            });

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
        const maxVisibility = 16777215;
        const colorDiff = Math.abs(this.getColorBehindChameleon() - this.player.getSkinColor());
        return (colorDiff / maxVisibility) * 100;
    }
}

const addColorData = function(name, target) {
    const option = document.createElement('option');
    option.innerText = name;
    target.append(option);
}

