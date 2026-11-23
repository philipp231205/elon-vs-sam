import { Character } from '../config.js';
import { gameLoop } from './gameLoop.js';
import { endBattle } from './endBattle.js';

import { CONFIG, gameState } from "../config.js";

export async function startBattle(player) {

    document.getElementById('SelectionScreen').style.display = 'none';
	document.getElementById('ControlPanel').style.display = 'none';
    document.getElementById('hud').style.display = 'flex';
    document.getElementById('timer').textContent = CONFIG.battleTime;

    let idP1;
    let idP2;

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
        gameState.player1 = new Character(false, idP1, CONFIG.characters.elon, CONFIG.fps);
        gameState.player2 = new Character(gameState.singleplayer, idP2, CONFIG.characters.sam, CONFIG.fps);
    } else {
        gameState.player1 = new Character(gameState.singleplayer, idP1, CONFIG.characters.elon, CONFIG.fps);
        gameState.player2 = new Character(false, idP2, CONFIG.characters.sam, CONFIG.fps);
    }

    gameState.player1.x = CONFIG.width * 0.25 - gameState.player1.width / 2;
    gameState.player1.y = CONFIG.height - gameState.player1.playerHeight;

    gameState.player2.x = CONFIG.width * 0.75 - gameState.player2.width / 2;
    gameState.player2.y = CONFIG.height - gameState.player2.playerHeight;

	// Player 2 facing left
	gameState.player2.facingRight = false;

    // Start Timer

    gameState.timer = setInterval(() => {
        gameState.timeRemaining--;
        document.getElementById('timer').textContent = gameState.timeRemaining;

        if (gameState.timeRemaining <= 0) {
            endBattle('time');
        }
    }, 1000);

    requestAnimationFrame(gameLoop); // Start Game Loop
}