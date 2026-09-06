import { update } from "../controls/playerControls.js";
import { getAttackBox, getBodyBox } from "../physics/boxes.js";
import { checkCollision } from "../physics/collisions.js";
import { updateHealthBar } from "../ui/healthBar.js";
import { render } from "../graphics/draw.js";

import { endBattle } from "./endBattle.js";

// Game Loop
export function gameLoop(gameState, player1, player2, CONFIG, keys, ctx, canvas) {
    if (gameState.phase !== 'battle') return;

    update(player1, player2, CONFIG, keys);
    update(player2, player1, CONFIG, keys);

    // Check for attacks
    if (player1.isAttacking) {
        const attackBox = getAttackBox(player1);
        if (checkCollision(attackBox, getBodyBox(player2))) {
            player2.health -= player1.attack;
            player1.isAttacking = false;
        }
    } else if (player2.isAttacking) {
        const attackBox = getAttackBox(player2);
        if (checkCollision(attackBox, getBodyBox(player1))) {
            player1.health -= player2.attack;
            player2.isAttacking = false;
        }
    }

    updateHealthBar('player1', player1);
    updateHealthBar('player2', player2);

    // Check for end conditions
    if (player1.health <= 0) {
        endBattle('p2', gameState, player1, player2);
    } else if (player2.health <= 0) {
        endBattle('p1', gameState, player1, player2);
    }
    render(player1, player2, ctx, canvas);
    requestAnimationFrame(() => gameLoop(gameState, player1, player2, CONFIG, keys, ctx, canvas));
}