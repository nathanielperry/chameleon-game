export default class StateMachine {
    constructor(actor) {
        this.activeState = null;
        this.actor = actor;
    }

    setState(state, args) {
        this.activeState = () => {
            state.bind(this.actor)(args);
        };
    }

    update() {
        this.activeState();
    }
}