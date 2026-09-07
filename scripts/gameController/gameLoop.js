import { update } from "../controls/playerControls.js";
import { getAttackBox, getBodyBox } from "../physics/boxes.js";
import { checkCollision } from "../physics/collisions.js";
import { updateHealthBar } from "../ui/healthBar.js";
import { render } from "../graphics/draw.js";
import { CONFIG, gameState } from "../config.js";

import { endBattle } from "./endBattle.js";

// Game Loop
export function gameLoop(keys, ctx, canvas) {
    if (gameState.phase !== 'battle') return;

    update(gameState.player1, gameState.player2, CONFIG, keys);
    update(gameState.player2, gameState.player1, CONFIG, keys);

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

    updateHealthBar('player1', gameState.player1);
    updateHealthBar('player2', gameState.player2);

    // Check for end conditions
    if (gameState.player1.health <= 0) {
        endBattle('p2', gameState, gameState.player1, gameState.player2);
    } else if (gameState.player2.health <= 0) {
        endBattle('p1', gameState, gameState.player1, gameState.player2);
    }
    render(gameState.player1, gameState.player2, ctx, canvas, gameState.bullets);
    requestAnimationFrame(() => gameLoop(keys, ctx, canvas));
}