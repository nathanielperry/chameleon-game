import _ from 'underscore';

import Phaser from 'phaser';
import Chameleon from '../objects/Chameleon';
import Background from '../objects/Background';
import TextBox from '../objects/TextBox';
import VisibilityMeter from '../objects/VisibilityMeter';

import colorData from '../lib/colors';

export default class GameScene extends Phaser.Scene
{
	constructor() {
		super('game-scene');
	}

	preload() {
        Chameleon.load(this);
        Background.load(this);
        const colorListElem = document.querySelector('#color-list');
        colorData.forEach((color) => {
            addColorData(color.name, colorListElem);
        });
    }

    create() {
        const scene = this;

        this.background = new Background(scene);
        this.player = new Chameleon(scene);
        this.textBox = new TextBox(scene);
        this.visibilityMeter = new VisibilityMeter(scene, 10, 10);

        this.player.setColor('#ac3232');

        //On color-change event, change color of chameleon
        this.events.on('color-change', (colorName) => {
            const color = colorData.find(c => {
                return c.name.toLowerCase() === colorName.toLowerCase();
            });

            this.player.setColor(color.hex);
        });
    }

    update() {
        this.background.update();
        this.visibilityMeter.fillBarTo(this.getChameleonVisibility());
    }

    getColorBehindChameleon() {
        return this.background.getHexColorOfPixelAt(
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

