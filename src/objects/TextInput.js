import Phaser from 'phaser';

export default class TextInput {
    constructor(scene) {
        const cx = document.querySelector('#game');
        this.input = document.createElement('input');
        this.input.setAttribute('id', 'color-text-box');
        this.input.setAttribute('name', 'color');
        this.input.setAttribute('list', 'color-list');

        cx.append(this.input);

        this.emitter = new Phaser.Events.EventEmitter();
        this.input.addEventListener('keydown', (e) => {
            //Something happens here.
            if (e.keyCode === 13) { //If enter is pressed
                scene.events.emit('color-change', e.target.value);
            }
        });
    }

    getValue() {
        return this.input.value;
    }
}