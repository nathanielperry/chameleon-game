import Phaser from 'phaser';

export default class TextBox {
    constructor() {
        this.elem = document.querySelector('#color-text-box');
        this.value = '';
        this.elem.addEventListener('onchange', (e) => {
            //Something happens here.
        });
    }

    getValue() {
        return this.elem.value;
    }
}