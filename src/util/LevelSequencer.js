export default class LevelSequencer {
    constructor(scene, steps) {
        this.steps = steps;
        this.scene = scene;
        this.currentStep = 0;
    }

    _runStep(i) {
        const currentStep = this.steps[i];
        const events = Object.entries(currentStep).map(e => {
            let [ fn, args ] = e;

            return new Promise((resolve, reject) => {
                return this['_' + fn](resolve, args);
            }) 
        });

        return Promise.all(events);
    }
    
    go(step = 0) {
        this.currentStep = step;

        this._runStep(step).then((res) => {
            const nextStep = step + 1;
            if (nextStep < this.steps.length) {
                this.go(step + 1);
            }
        });
    }

    //events
    _wait(res, duration) {
        console.log('waiting:', duration)
        setTimeout(() => res(), duration);
    }
    
    _waitFor(res, eventName) {
        console.log('waiting for:', eventName);
        this.scene.events.on(eventName, () => {
            res();
        });
    }
    
    _checkpoint(res, checkpointName) {
        //TODO: Save state here
        res();
    }

    _event(res, eventName, data) {
        console.log(eventName);
        this.scene.events.emit(eventName, data);
        res();
    }

    _scroll(res, args) {
        const cam = this.scene.cameras.main;
        const [ x, y, duration, ease ] = args;
        cam.pan(
            cam.scrollX + x + cam.width / 2,
            cam.scrollY + y + cam.height / 2,
            duration || 2000,
            ease || 'Cubic'
        );
        res();
    }

    _actor(res, args) {
        const [ actor, action, actionArgs ] = args;
        this.scene.events.emit(`${actor}-act`, { action, actionArgs });
        res();
    }
}