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

    obj.isBlocking = false;
    let aiDecision = 0; // 1: Walk left; 2: Walk right; 3: Jump; 4: Attack; 5: Shoot; 6: Block;

    let distanceToOpp = obj.x - opponent.x;

    let prob = [40, 20, 20, 20, 20, 20, 20];

    // Game Rules, modify for updates in AI

	// Walking rules
	if (distanceToOpp > 75) {prob[1] += distanceToOpp};
	if (distanceToOpp < 75) {prob[2] -= distanceToOpp}; 


    // Shooting Rules

    if (opponent.currentShootingCooldown > 0) {prob[6] += 20};
    if (distanceToOpp < 50) {prob[6] -= 20}


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

	updateAnimation(obj);
}