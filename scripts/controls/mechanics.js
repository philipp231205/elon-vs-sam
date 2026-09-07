import { gameState } from "../config.js";

// Sets attack state
export function doAttack(obj) {
    if (obj.attackCooldown <= 0) {
        obj.isAttacking = true;
        obj.attackCooldown = 60; // Cooldown in frames
    }
}

export function doShoot(obj) {
    if (obj.currentShootingCooldown <= 0) {
        console.log(obj.name);
        let bullet = new Bullet(obj.x, obj.y, 10, obj.facingRight);
        gameState.bullets.push(bullet);
        obj.currentShootingCooldown = obj.shootingCooldown;
    }
}

export class Bullet {
    constructor(x, y, speed, right) {
        this.x = x,
        this.y = y,
        this.speed = speed,
        this.right = right
    }
}