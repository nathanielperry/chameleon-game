import Phaser from 'phaser';

export default class TextBox {
    constructor(scene) {
        this.elem = document.querySelector('#color-text-box');
        this.value = '';
        this.emitter = new Phaser.Events.EventEmitter();
        this.elem.addEventListener('keydown', (e) => {
            //Something happens here.
            if (e.keyCode === 13) { //If enter is pressed
                scene.events.emit('color-change', e.target.value);
            }
        });
    }

    getValue() {
        return this.elem.value;
    }
}