const PLAYER = 'chameleon';
const BADGUY = 'badguy';
const IDLE = 'idle';
const POSE = 'pose';
const WALK = 'walk';
const RUN = 'run';

const levelSequence = [
    //Chameleon Enters Frame
    {
        checkpoint: 'start',
        wait: 3000,
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
        scroll: [0, -50, 1000],
        actor: [BADGUY, WALK, 1],
        event: (res, scene) => {
            const interval = setInterval(() => {
                if (scene.badguy.x > 220) {
                    clearInterval(interval);
                    res();
                }
            }, 10);
        },
    },
    {
        actor: [BADGUY, IDLE, 1],
        wait: 3000
    },
    //The camera pans down, showing the chameleon wall-hugging the bush
    {
        actor: [PLAYER, POSE, 'chameleon-wall-hug'],
        scroll: [0, 50, 3000],
        wait: 3000,
    },
    //If too visible, the something's eyes shoot open and a shock noise plays (Game Over!)
    //Otherwise, the something lumbers on.
    {

    }
    //The chameleon idles for a second
    //The chameleon begins walking to the right
    
    
    
    //You see the bad guy's hat come by like a shark
    
    //The bad guy's hat comes off, revealing his bald head
    //The chameleon has to camoflauge on the brim of the hat
    //and the bad guy puts his hat back on and you ride him

    //The chameleon sprints off like a human on 2 legs
];

export default levelSequence;