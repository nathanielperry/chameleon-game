import Phaser from 'phaser';
import Chameleon from '../objects/Chameleon';
import Background from '../objects/Background';

export default class GameScene extends Phaser.Scene
{
	constructor() {
		super('game-scene');
	}

	preload() {
        Chameleon.load(this);
        Background.load(this);
    }

    create() {
        this.background = new Background(this);
        this.player = new Chameleon(this);
    }

    update() {
        this.background.update();
    }
}
