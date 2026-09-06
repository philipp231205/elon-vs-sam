// Sets attack state
export function doAttack(obj) {
    if (obj.attackCooldown <= 0) {
        obj.isAttacking = true;
        obj.attackCooldown = 60; // Cooldown in frames
    }
}