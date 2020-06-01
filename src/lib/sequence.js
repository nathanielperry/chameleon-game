import Door from "../objects/Door";

const PLAYER = 'chameleon';
const BADGUY = 'badguy';
const IDLE = 'idle';
const POSE = 'pose';
const WALK = 'walk';
const RUN = 'run';

const walkToX = (scene, actor, x, dir) => {
    return new Promise((resolve) => {
        scene[actor].stateMachine.setState(scene[actor].walk, dir);
        const interval = setInterval(() => {
            if (scene[actor].x > x) {
                clearInterval(interval);
                resolve();
            }
        }, 10);
    });
}

const runToX = (scene, actor, x, dir) => {
    return new Promise((resolve) => {
        scene[actor].stateMachine.setState(scene[actor].run, dir);
        const interval = setInterval(() => {
            if (scene[actor].x > x) {
                clearInterval(interval);
                resolve();
            }
        }, 10);
    });
}

const levelSequence = [
    //Chameleon Enters Frame
    {
        checkpoint: 'start',
        wait: 1000,
        event: (res, scene) => {
            walkToX(scene, 'player', 325, 1)
            .then(() => { res(); });
        },
    },
    //Chameleon stops at bush - start tutorial
    {
        actor: [PLAYER, IDLE],
        event: (res, scene) => {
            scene.text.writeToTextInput('Type color, hit enter', 3000);
            scene.text.input.focus();

            scene.events.once('hidden', () => res());
        },
    },
    //Idle for a moment
    {
        wait: 2000,
    },
    //Camera pans up, and something strolls by, stopping just behind the bush.
    {
        scroll: [0, -66, 1000],
        actor: [BADGUY, WALK, 1],
        event: (res, scene) => {
            walkToX(scene, BADGUY, 330, 1)
            .then(() => res());
        },
    },
    {
        actor: [BADGUY, IDLE, 1],
        wait: 1000,
    },
    //The camera pans down, showing the chameleon wall-hugging the bush
    {
        actor: [PLAYER, POSE, 'chameleon-wall-hug'],
        scroll: [0, 66, 3000],
        wait: 3000,
    },
    //If too visible, the something's eyes shoot open and a shock noise plays (Game Over!)
    //Otherwise, the something lumbers on.
    {
        detectionCheck: 2000,
        wait: 3000,
    },
    {
        actor: [PLAYER, IDLE, 1],
        wait: 1000,
        checkpoint: 'bush',
    },
    {
        event: (res, scene) => {
            walkToX(scene, BADGUY, 500, 1)
            .then(() => res());
        },
    },
    //The chameleon idles for a second
    //The chameleon begins walking to the right
    {
        event: (res, scene) => {
            scene.cameras.main.startFollow(scene.player, true, 0.1);
            walkToX(scene, 'player', 600, 1)
            .then(() => res());
        },
    },
    {
        detectionCheck: 3000,
    },
    {
        event: (res, scene) => {
            walkToX(scene, 'player', 980, 1)
            .then(() => res());
        }
    },
    //Chameleon gets to moss
    {
        actor: [PLAYER, POSE, 'chameleon-t-pose'],
        event: (res, scene) => {
            walkToX(scene, BADGUY, 900, 1)
            .then(() => res());
        }
    },
    //Guy stops and looks
    {
        actor: [BADGUY, IDLE, 1],
        detectionCheck: 5000,
    },
    //Guy moves on
    {
        event: (res, scene) => {
            walkToX(scene, BADGUY, 1200, 1)
            .then(() => res());
        }
    },
    //He approaches a house
    {
        //1755, 1130
        actor: [BADGUY, IDLE, 0],
        event: (res, scene) => {            
            const badguy = scene.badguy;
            badguy.body.setSize(badguy.width, badguy.height + 128);
            badguy.setPosition(1755, 1130);
            badguy.setAlpha(0);
            res();
        }
    },
    {
        event: (res, scene) => {
            walkToX(scene, 'player', 1100, 1)
            .then(() => res());
        }
    },
    {
        actor: [PLAYER, IDLE, 1],
        checkpoint: 'dog',
        wait: 2000,
    },
    //A dog sleeps on the lawn
    {
        scroll: [450, 0, 2000],
        wait: 4000,
        event: (res, scene) => {
            scene.cameras.main.stopFollow(scene.player);
            res();
        }
    },
    {
        scroll: [-450, 0, 2000],
        wait: 2000,
    },
    {
        event: (res, scene) => {
            scene.cameras.main.startFollow(scene.player, true, 0.1);
            res();
        }
    },
    //To approach the house and not alart the dog, he jumps from lawn item to lawn item,
    //changing colors inbetween
    {
        event: (res, scene) => {
            walkToX(scene, 'player', 1190, 1)
            .then(() => res());
        }
    },
    {
        actor: [PLAYER, POSE, 'chameleon-t-pose'],
        wait: 2000,
    },
    {
        detectionCheck: 2000,
    },
    {
        event: (res, scene) => {
            walkToX(scene, 'player', 1290, 1)
            .then(() => res());
        }
    },
    {
        actor: [PLAYER, POSE, 'chameleon-wall-hug'],
        wait: 2000,
    },
    {
        detectionCheck: 2000,
    },
    {
        event: (res, scene) => {
            walkToX(scene, 'player', 1405, 1)
            .then(() => res());
        }
    },
    {
        actor: [PLAYER, POSE, 'chameleon-t-pose-down'],
        wait: 2000,
    },
    {
        detectionCheck: 2000,
        wait: 3000,
    },
    //Fade out cheaply
    {
        event: (res, scene) => {
            scene.cameras.main.fade(250, 0, 0, 0);
            res();
        },
        wait: 750,
    },
    {
        event: (res, scene) => {
            scene.player.body.setSize(64, 191);
            scene.player.setDepth(1);
            walkToX(scene, 'player', 1530, 1)
            .then(() => res());
        }
    },
    {
        event: (res, scene) => {
            scene.cameras.main.fadeIn(250, 0, 0, 0);
            res();
        },
        wait: 2000,
        checkpoint: 'house',
    },
    {
        event: (res, scene) => {
            walkToX(scene, 'player', 1690, 1)
            .then(() => res());
        }
    },
    //When he approaches the door, it opens, with yellow light spilling on him
    //He has to hide quickly in the yellow light to avoid detection
    {
        event: (res, scene) => {
            scene.door.appear();
            //TODO: Play door sound
            scene.sound.play('door-open');
            scene.badguy.setAlpha(1);
            res();
        },
        actor: [PLAYER, IDLE, 1],
        wait: 1000,
    },
    {
        detectionCheck: 5000,
    },
    {
        event: (res, scene) => {
            scene.sound.play('door-close');
            scene.door.dissappear();
            scene.badguy.setAlpha(0);
            walkToX(scene, 'player', 2333, 1)
            .then(() => res());
        }
    },
    {
        event: (res, scene) => {
            scene.player.body.setSize(64, 64);
            res();
        },
        actor: [PLAYER, RUN, 1],
    },
    //He passes the house
    //As he is leaving, a door slams open
    //The badguy is seen coming from behind
    {
        event: (res, scene) => {
            scene.badguy.body.setSize(scene.badguy.width, scene.badguy.height);
            scene.badguy.setAlpha(1);
            scene.sound.play('door-open');
            runToX(scene, 'player', 2618, 1)
            .then(() => res());
        },
        actor: [BADGUY, RUN, 1],
    },
    {
        event: (res, scene) => {
            runToX(scene, 'player', 3030, 1)
            .then(() => res());
        },
    },
    {
        event: (res, scene) => {
            scene.cameras.main.fade(4000, 0, 0, 0, 0);
            res();
        },
        wait: 4000,
    },
    {
        event: (res, scene) => {
            scene.badguy.destroy();
            scene.sound.play('horrible');
            scene.music.stop();
            scene.text.input.value = '';
            scene.text.writeToTextInput('THE END . . . ;)', 5000);
            scene.text.input.focus();
        }
    }

    //The chameleon hides, then his cover is blown just as the bad guy is getting near
    //The chameleon sprints off like a human on 2 legs
    //The chameleon stops and poses a few times, changing colors, and gets his cover blown every time

    //The chameleon climbs a spooky tree
    //The badguy stops, waits, then goes back home
    //THE END

    //--------------------//

    //The chameleon t-poses at a perfectly shaped object

    //The chameleon sidles along a ledge, while the badguy looks for him below
    
    //You see the bad guy's hat come by like a shark
    
    //The bad guy's hat comes off, revealing his bald head
    //The chameleon has to camoflauge on the brim of the hat
    //and the bad guy puts his hat back on and you ride him

    
];

export default levelSequence;