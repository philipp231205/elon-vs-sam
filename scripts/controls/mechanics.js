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
        let bullet = new Bullet(obj.x, obj.y, 7.5, obj.facingRight);
        gameState.bullets.push(bullet);
        obj.currentShootingCooldown = obj.shootingCooldown;
    }
}

export function updateBullet(obj) {
    // Collision checks and damage
    if (false) {


        let i = gameState.bullets.indexOf(obj);
        gameState.bullets.splice(i, 1);
    }

    if (obj.right) {
        obj.x += obj.speed;
    } else {
        obj.x -= obj.speed;
    }
}

class Bullet {
    constructor(x, y, speed, right) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.right = right;

        this.spriteSize = 20;

        this.sprite = new Image();
        this.sprite.src = 'assets/bullet.svg';
    }
}