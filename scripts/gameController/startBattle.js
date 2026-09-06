import { Character } from '../config.js';
import { gameLoop } from './gameLoop.js';
import { endBattle } from './endBattle.js';

export function startBattle(player, CONFIG, gameState, keys, ctx, canvas) {
    document.getElementById('SelectionScreen').style.display = 'none';
    document.getElementById('hud').style.display = 'flex';
    document.getElementById('timer').textContent = CONFIG.battleTime;

    let idP1;
    let idP2;
    
    let player1 = gameState.player1;
    let player2 = gameState.player2;
    let timer = null;

    let singleplayer = gameState.singleplayer;

    if (player === 'Elon Musk') {
        gameState.selections.player1 = 'Elon Musk';
        gameState.selections.player2 = 'Sam Altman';

        idP1 = 1;
        idP2 = 2;
    } else {
        gameState.selections.player1 = 'Sam Altman';
        gameState.selections.player2 = 'Elon Musk';

        idP1 = 2;
        idP2 = 1;
    }

    gameState.phase = 'battle';
    if (player === 'Elon Musk') {
        player1 = new Character(false, idP1, CONFIG.characters.elon.name, CONFIG.characters.elon.health, CONFIG.characters.elon.attack, CONFIG.characters.elon.speed, CONFIG.characters.elon.jump_power, CONFIG.characters.elon.ai_decisionCooldown, CONFIG.playerwidth, CONFIG.playerheight);
        player2 = new Character(singleplayer, idP2, CONFIG.characters.sam.name, CONFIG.characters.sam.health, CONFIG.characters.sam.attack, CONFIG.characters.sam.speed, CONFIG.characters.sam.jump_power, CONFIG.characters.sam.ai_decisionCooldown, CONFIG.playerwidth, CONFIG.playerheight);
    } else {
        player1 = new Character(singleplayer, idP1, CONFIG.characters.elon.name, CONFIG.characters.elon.health, CONFIG.characters.elon.attack, CONFIG.characters.elon.speed, CONFIG.characters.elon.jump_power, CONFIG.characters.elon.ai_decisionCooldown, CONFIG.playerwidth, CONFIG.playerheight);
        player2 = new Character(false, idP2, CONFIG.characters.sam.name, CONFIG.characters.sam.health, CONFIG.characters.sam.attack, CONFIG.characters.sam.speed, CONFIG.characters.sam.jump_power, CONFIG.characters.sam.ai_decisionCooldown, CONFIG.playerwidth, CONFIG.playerheight);
    }

    player1.x = CONFIG.width * 0.25 - player1.width / 2;
    player1.y = CONFIG.height - player1.height;

    player2.x = CONFIG.width * 0.75 - player2.width / 2;
    player2.y = CONFIG.height - player2.height;

    // Start Timer

    timer = setInterval(() => {
        gameState.timeRemaining--;
        document.getElementById('timer').textContent = gameState.timeRemaining;

        if (gameState.timeRemaining <= 0) {
            endBattle('time');
        }
    }, 1000);

    gameLoop(gameState, player1, player2, CONFIG, keys, ctx, canvas);
}