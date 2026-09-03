export const CONFIG = {
    width: window.innerWidth,
    height: window.innerHeight,
    playerwidth: window.innerWidth * 0.1,
    playerheight: window.innerHeight * 0.4,
    battleTime: 120, // seconds
    gravity: 0.5,
    characters: {
        elon: {
            name: 'Elon Musk',
            health: 370,
            attack: 17,
            speed: window.innerWidth / 220, // SPEED PARAMETER
            jump_power: window.innerHeight / 40, // JUMP POWER PARAMETER
            ai_decisionCooldown: 30
        },
        sam: {
            name: 'Sam Altman',
            health: 350,
            attack: 15,
            speed: window.innerWidth / 200, // SPEED PARAMETER
            jump_power: window.innerHeight / 35, // JUMP POWER PARAMETER
            ai_decisionCooldown: 50
        }
    }
}