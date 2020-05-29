import Phaser from 'phaser';
import Chameleon from '../objects/Chameleon';
import Background from '../objects/Background';
import TextBox from '../objects/TextBox';

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
        this.background = new Background(this);
        this.player = new Chameleon(this);
        this.textBox = new TextBox();
    }

    update() {
        this.background.update();
    }
}

const addColorData = function(name, target) {
    const option = document.createElement('option');
    option.innerText = name;
    target.append(option);
}
