import { doShoot } from '../controls/mechanics.js';

// AI Decisions
export function updateAI(obj, opponent) {
    obj.isBlocking = false;
    let aiDecision = 0; // 1: Walk left; 2: Walk right; 3: Jump; 4: Attack; 5: Shoot; 6: Block;

    let distanceToOpp = obj.x - opponent.x;
    if (distanceToOpp < 0 ) { distanceToOpp = distanceToOpp * -1};

    let prob = [40, 20, 20, 20, 20, 20, 20];

    // Game Rules, modify for updates in AI


    // Blocking Rules

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

    console.log(aiDecision);

    // Perform actions based on decisions

    if (aiDecision == 1) {
        obj.facingRight = false;
        obj.velX += obj.speed;
    } else if (aiDecision == 2) {
        obj.facingRight = true;
        obj.velX -= obj.speed;
    } else if (aiDecision == 3 && isJumping == false) {
        obj.velY -= obj.jump_power;
        obj.isJumping = true;
    } else if (aiDecision == 4) {
        doAttack(obj);
    } else if (aiDecision == 5) {
        obj.isAttacking = true;
    } else if (aiDecision == 6) {
        obj.isBlocking = true;
    };
}