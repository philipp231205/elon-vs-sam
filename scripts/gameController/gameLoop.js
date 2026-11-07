import { update } from "../controls/playerControls.js";
import { getAttackBox, getBodyBox } from "../physics/boxes.js";
import { checkCollision } from "../physics/collisions.js";
import { updateHealthBar } from "../ui/healthBar.js";
import { render } from "../graphics/draw.js";
import { CONFIG, gameState } from "../config.js";
import { updateBullet } from "../controls/mechanics.js";
import { shootingCooldownBar } from "../ui/shootingCooldownBar.js";

import { endBattle } from "./endBattle.js";
import { updateAnim } from "../graphics/animation.js";

let lastTime = 0;
const frameIntervall = 1000 / CONFIG.fps;

// Game Loop
export function gameLoop(time) {

    if (gameState.phase !== 'battle') return;

	requestAnimationFrame(gameLoop);

	const deltaTime = time - lastTime;

	if (deltaTime < frameIntervall) return;
	
	lastTime = time - (deltaTime % frameIntervall);

    update(gameState.player1, gameState.player2, CONFIG, gameState.keys);
    update(gameState.player2, gameState.player1, CONFIG, gameState.keys);

    // Check for attacks
    if (gameState.player1.isAttacking) {
        const attackBox = getAttackBox(gameState.player1);
        if (checkCollision(attackBox, getBodyBox(gameState.player2))) {
            gameState.player2.health -= gameState.player1.attack;
            gameState.player1.isAttacking = false;
        }
    } else if (gameState.player2.isAttacking) {
        const attackBox = getAttackBox(gameState.player2);
        if (checkCollision(attackBox, getBodyBox(gameState.player1))) {
            gameState.player1.health -= gameState.player2.attack;
            gameState.player2.isAttacking = false;
        }
    }

    gameState.bullets.forEach((item) => {
        updateBullet(item);
    });

    gameState.anims.forEach((item) => {
        updateAnim(item);
    })

    updateHealthBar('player1', gameState.player1);
    updateHealthBar('player2', gameState.player2);

    // Check for end conditions
    if (gameState.player1.health <= 0) {
        endBattle('p2', gameState, gameState.player1, gameState.player2);
    } else if (gameState.player2.health <= 0) {
        endBattle('p1', gameState, gameState.player1, gameState.player2);
    }

	shootingCooldownBar('player1', gameState.player1);
	shootingCooldownBar('player2', gameState.player2);

    render(gameState.player1, gameState.player2, gameState.ctx, gameState.canvas, gameState.bullets, gameState.anims);
}