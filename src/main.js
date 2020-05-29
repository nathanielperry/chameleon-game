import Phaser from 'phaser'
import GameScene from './scenes/GameScene'

const config = {
	type: Phaser.AUTO,
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
			gravity: { y: 200 }
		}
	},
	scene: [GameScene]
}

export default new Phaser.Game(config);