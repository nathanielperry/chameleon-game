const PLAYER = 'chameleon';
const IDLE = 'idle';
const POSE = 'pose';
const WALK = 'walk';
const RUN = 'run';

const levelSequence = [
    //Chameleon Enters Frame
    {
        checkpoint: 'start',
        wait: 1250,
    },
    //Chameleon stops at bush - start tutorial
    {
        actor: [PLAYER, IDLE],
        event: 'tutorial',
        waitFor: 'tutorial-complete',
    },
    //Camera pans up, and something strolls by, stopping just behind the bush.
    {
        wait: 4000,
        scroll: [0, -50, 1000],
    },
    //The camera pans down, showing the chameleon wall-hugging the bush
    {
        actor: [PLAYER, POSE, 'wall-hug'],
        scroll: [0, 50, 3000],
        wait: 3000,
    },
    //If too visible, the something's eyes shoot open and a shock noise plays (Game Over!)
    //Otherwise, the something lumbers on.
    {

    }
    //The chameleon idles for a second
    //The chameleon begins walking to the right

    //The chameleon stops at a house.
    //The camera pans up and right to indicate an open window.
    //The chameleon climbs a drain pipe
    //The chameleon enters the open window, finding himself in a tiled bathroom
];

export default levelSequence;