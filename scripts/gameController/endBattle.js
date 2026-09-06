import { updateHealthBar } from '../ui/healthBar.js';

// End Battle
export function endBattle(reason, gameState, player1, player2) {

    clearInterval(timer);
    gameState.phase = 'gameover';

    let winner;
    if (reason === 'p1') {
        player2.health = 0;
        updateHealthBar('player2', player2);
        winner = 'Elon Musk wins!';
    } else if (reason === 'p2') {
        player1.health = 0;
        updateHealthBar('player1', player1);
        winner = 'Sam Altman wins!';
    } else {
        winner = 'It\'s a Draw!';
    }

    document.getElementById('gameOverScreen').style.display = 'flex';
    document.getElementById('winnerName').textContent = winner;
}