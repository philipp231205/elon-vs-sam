import { doAttack, doShoot } from '../controls/mechanics.js';
import { determineAnimation, updateAnimation } from '../graphics/animation.js';
import { updateAI } from '../ai/ai.js';

export function update(obj, opponent, CONFIG, keys) {

    obj.velX = 0;

    if (obj.isAI) {
        updateAI(obj, opponent);
    }

    // Controls
    if (!obj.isAI && obj.id == 1) {
        if (keys['w'] && !obj.isJumping) {
            obj.velY -= obj.jump_power;
            obj.isJumping = true;
        }
        if (keys['a']) {
            obj.velX -= obj.speed;
            obj.facingRight = false;
        }
        if (keys['d']) {
            obj.velX += obj.speed;
            obj.facingRight = true;
        }
        if (keys[' ']) {
            doAttack(obj);
        }
        if (keys['e']) {
            doShoot(obj);
        }
		if (keys['q']) {
            obj.isBlocking = true;
        } else {
			obj.isBlocking = false;
		}
    } else if (!obj.isAI && obj.id == 2) {
        if (keys['ArrowUp'] && !obj.isJumping) {
            obj.velY -= obj.jump_power;
            obj.isJumping = obj;
        }
        if (keys['ArrowLeft']) {
            obj.velX -= obj.speed;
            obj.facingRight = false;
        }
        if (keys['ArrowRight']) {
            obj.velX += obj.speed;
            obj.facingRight = true;
        }
        if (keys['Enter']) {
            doAttack(obj);
        }
        if (keys['p']) {
            doShoot(obj);
        }
		if (keys['l']) {
            obj.isBlocking = true;
        } else {
			obj.isBlocking = false;
		}
    }

    // Apply gravity
    obj.velY += CONFIG.gravity;

    // Update position
    obj.x += obj.velX;
    obj.y += obj.velY;

    // Boundary checks

    if (obj.y + obj.playerHeight >= CONFIG.height) {
        obj.y = CONFIG.height - obj.playerHeight;
        obj.isJumping = false;
        obj.velY = 0;
    }

    if (obj.x < 0) obj.x = 0;
    if (obj.x + obj.playerWidth > CONFIG.width) obj.x = CONFIG.width - obj.playerWidth;

    // Attack cooldown
    if (obj.attackCooldown > 0) {
        obj.attackCooldown--;
        if (obj.isAttacking) obj.attackAnimationTime++;
    } else {
        obj.isAttacking = false;
        obj.attackAnimationTime = 0;
    }

    // Shooting cooldown
    if (obj.currentShootingCooldown > 0) {
        obj.currentShootingCooldown--;
    }

	if (obj.currentShootingReload >= obj.shootingReload) {
		obj.currentShootingReload = 0;
		if (obj.currentShootingCapacity < obj.shootingCapacity) {
			obj.currentShootingCapacity++;
		}
	} else {
		obj.currentShootingReload++;
	}

    determineAnimation(obj);
    updateAnimation(obj);
}