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
        if (keys[' ']) {
            obj.isAttacking = true;
        }
        if (keys['Control']) {
            obj.isShooting = true;
        } else {
            obj.isShooting = false;
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
        if (keys['ArrowDown']) {
            obj.isAttacking = true;
        }
        if (keys['Enter']) {
            obj.isShooting = true;
        } else {
            obj.isShooting = false;
        }
		if (keys['5']) {
            obj.isBlocking = true;
        } else {
			obj.isBlocking = false;
		}
    }

    determineAnimation(obj, keys);
    updateAnimation(obj);
}