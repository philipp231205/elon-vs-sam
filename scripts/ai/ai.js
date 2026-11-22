import { setAnimation, updateAnimation } from "../graphics/animation.js";

// AI Decisions
export function updateAI(obj, opponent) {

	if (obj.ai_decisionCooldown > 0) {
		obj.isMovingLeft = obj.aiWalkingLeft;
		obj.isMovingRight = obj.aiWalkingRight;
		obj.isJumping = obj.aiJumping;
		obj.isAttacking = obj.aiAttacking;
		obj.isShooting = obj.aiShooting;
		obj.isBlocking = obj.aiBlocking;

		obj.ai_decisionCooldown--;
		return;
	}

	obj.ai_decisionCooldown = obj.ai_maxDecisionCooldown;

	obj.aiWalkingLeft = false;
	obj.aiWalkingRight = false;

    obj.isBlocking = false;
    let aiDecision = 0; // 1: Walk left; 2: Walk right; 3: Jump; 4: Attack; 5: Shoot; 6: Block;

    let distanceToOpp = obj.x - opponent.x;

    let prob = [40, 20, 20, 20, 20, 20, 20];

    // Game Rules, modify for updates in AI

	// Walking left rules
	if (-distanceToOpp < -obj.playerWidth) { prob[1] += 150};
	if (obj.currentShootingCapacity >= (obj.shootingCapacity / 2)) { prob[1] -= 20};

	// Walking right rules
	if (distanceToOpp > obj.playerWidth) { prob[2] += 150};
	if (obj.currentShootingCapacity >= (obj.shootingCapacity / 2)) { prob[2] -= 20};

	// Jumping rules
	if (opponent.isJumping) { prob[3] += 140};
	if (distanceToOpp < obj.playerWidth || -distanceToOpp > -obj.playerWidth) { prob[3] -= 30};

	// Attacking rules
	if (distanceToOpp < obj.playerWidth || -distanceToOpp > -obj.playerWidth) { prob[4] += 150 };
	if (obj.currentShootingCapacity >= (obj.shootingCapacity / 2)) { prob[4] -= 30};

	// Shooting rules
	if (obj.currentShootingCapacity >= (obj.shootingCapacity / 2)) { prob[5] += 150};
	if (opponent.isBlocking) { prob[5] -= 70}

	// Blocking rules
	if (opponent.isShooting) { prob[6] += 150};
	if (distanceToOpp < obj.playerWidth || -distanceToOpp > -obj.playerWidth) { prob[6] -= 30};


    let sum = 0;
    prob.forEach(item => {
        sum += item;
    });

    let r = Math.random() * sum;

    for (let i = 0; i < prob.length; i++) {
        r -= prob[i];

        if (r <= 0) {
            aiDecision = i;
            break;
        }
    }

    // Perform actions based on decisions

    if (aiDecision == 1) {
        obj.isMovingLeft = true;
		obj.aiWalkingLeft = true;
		setAnimation(obj, 'walk');
    } else if (aiDecision == 2) {
        obj.isMovingRight = true;
		obj.aiWalkingRight = true;
		setAnimation(obj, 'walk');
    } else if (aiDecision == 3) {
        obj.isJumping = true;
		obj.aiJumping = true;
		setAnimation(obj, 'jump');
    } else if (aiDecision == 4) {
        obj.isAttacking = true;
		obj.aiAttacking = true;
		setAnimation(obj, 'attack');
    } else if (aiDecision == 5) {
        obj.isShooting = true;
		obj.aiShooting = true;
		setAnimation(obj, 'shoot');
    } else if (aiDecision == 6) {
        obj.isBlocking = true;
		obj.aiBlocking = true;
		setAnimation(obj, 'block');
    } else {
		setAnimation(obj, 'idle');
	}
}