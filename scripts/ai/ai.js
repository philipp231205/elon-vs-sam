import { doAttack } from '../controls/mechanics.js';

// AI Decisions
export function updateAI(obj, opponent) {
    const distanceToOpp = opponent.x - obj.x;

    if (obj.aiDecisionCooldown <= 0) {
        // AI walking towards opponent if far away, otherwise random movement
        if (distanceToOpp > 50) {
            obj.aiWalking = true;
            obj.aiWalkTarget = opponent.x; // Walk right
        } else if (distanceToOpp < -50) {
            obj.aiWalking = true;
            obj.aiWalkTarget = opponent.x; // Walk left
        }

        // Random jump
        if (Math.random() < 0.01 && !obj.isJumping) {
            obj.aiJumping = true;
        }	

        // Attack if close
        if (Math.abs(distanceToOpp) < 60 && obj.attackCooldown <= 0) {
            obj.aiAttacking = true;
        }

        obj.aiDecisionCooldown = obj.aiDefaultDecisionCooldown + Math.floor(Math.random() * 15); // New decision every 0.5-1 seconds
    }

    obj.aiDecisionCooldown--;


    // Perform actions based on decisions

    if (obj.aiWalking) {
        if (distanceToOpp > 50) {
            obj.velX += obj.speed;
            obj.facingRight = true;
        } else if (distanceToOpp < -50) {
            obj.velX -= obj.speed;
            obj.facingRight = false;
        }

        if (Math.abs(distanceToOpp) < 10) {
            obj.aiWalking = false; // Stop walking if close enough
        }
    }

    if (obj.aiJumping) {
        obj.velY -= obj.jump_power;
        obj.isJumping = true;
        obj.aiJumping = false; // Reset jump decision
    }

    if (obj.aiAttacking) {
        doAttack(obj);
        obj.aiAttacking = false; // Reset attack decision
    }
}