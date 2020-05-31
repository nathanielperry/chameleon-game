import Phaser from 'phaser'
import GameScene from './scenes/GameScene'

const config = {
	type: Phaser.AUTO,
	parent: 'game',
	
	width: 320,
	height: 160,
	scale: {
		mode: Phaser.Scale.FIT,
	},
	render: {
		pixelArt: true,
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
			debug: true,
			debugShowBody: true,
			debugBodyColor: 0x00ff00,
		}
	},
	scene: [GameScene]
}

const game = new Phaser.Game(config);

export default game;