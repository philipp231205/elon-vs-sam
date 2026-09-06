import { updateHealthBar } from '../ui/healthBar.js';
import { gameState } from "../config.js";

// End Battle
export function endBattle(reason) {

    clearInterval(gameState.timer);
    gameState.phase = 'gameover';

    let winner;
    if (reason === 'p1') {
        gameState.player2.health = 0;
        updateHealthBar('player2', gameState.player2);
        winner = 'Elon Musk wins!';
    } else if (reason === 'p2') {
        gameState.player1.health = 0;
        updateHealthBar('player1', gameState.player1);
        winner = 'Sam Altman wins!';
    } else {
        winner = 'It\'s a Draw!';
    }

    document.getElementById('gameOverScreen').style.display = 'flex';
    document.getElementById('winnerName').textContent = winner;
}