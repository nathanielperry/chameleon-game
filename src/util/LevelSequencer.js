export default class LevelSequencer {
    constructor(scene, steps) {
        this.steps = steps;
        this.scene = scene;
        this.currentStep = 0;
        this.stopped = false;
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
            if (this.stopped) return;
            const nextStep = step + 1;
            if (nextStep < this.steps.length) {
                this.go(step + 1);
            }
        });
    }

    restart() {
        this.stopped = false;
    }

    _stop() {
        this.stopped = true;
    }

    //events
    _wait(res, duration) {
        setTimeout(() => res(), duration);
    }
    
    _waitFor(res, eventName) {
        this.scene.events.on(eventName, () => {
            res();
        });
    }
    
    _checkpoint(res, checkpointName) {
        this.scene.saveState(checkpointName);
        res();
    }

    _event(res, eventFn) {
        eventFn(res, this.scene);
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

    _detectionCheck(res, args) {
        const duration = args;
        const detectInterval = setInterval(() => {
            if (this.scene.getChameleonVisibility() > 10) {
                clearInterval(detectInterval);
                this.scene.gameOver();
                this._stop();
            }
        }, 10);

        setTimeout(() => {
            clearInterval(detectInterval);
            res();
        }, duration);
    }
}