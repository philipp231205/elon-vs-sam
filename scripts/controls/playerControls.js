import { doAttack, doShoot } from '../controls/mechanics.js';
import { determineAnimation, updateAnimation } from '../graphics/animation.js';
import { updateAI } from '../ai/ai.js';

export function update(obj, opponent, CONFIG, keys) {

    obj.updatePlayer();

    if (obj.isAI) {
        updateAI(obj, opponent);
    }

    // Controls
    if (!obj.isAI && obj.id == 1) {
        if (keys['w']) {
            obj.isJumping = true;
        }
        if (keys['a']) {
            obj.isMovingLeft = true;
        }
        if (keys['d']) {
            obj.isMovingRight = true;
        }
        if (keys[' '] && !obj.isBlocking) {
            doAttack(obj);
        }
        if (keys['Control'] && !obj.isBlocking) {
            doShoot(obj);
        }
		if (keys['Shift']) {
            obj.isBlocking = true;
        } else {
			obj.isBlocking = false;
		}
    } else if (!obj.isAI && obj.id == 2) {
        if (keys['8']) {
            obj.isJumping = true;
        }
        if (keys['4']) {
            obj.isMovingLeft = true;
        }
        if (keys['6']) {
            obj.isMovingRight = true;
        }
        if (keys['ArrowDown'] && !obj.isBlocking) {
            doAttack(obj);
        }
        if (keys['Enter'] && !obj.isBlocking) {
            doShoot(obj);
        }
		if (keys['5']) {
            obj.isBlocking = true;
        } else {
			obj.isBlocking = false;
		}
    }

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

    determineAnimation(obj, keys);
    updateAnimation(obj);
}