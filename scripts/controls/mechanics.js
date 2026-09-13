import { CONFIG, gameState } from "../config.js";
import { checkCollision } from "../physics/collisions.js";

// Sets attack state
export function doAttack(obj) {
    if (obj.attackCooldown <= 0) {
        obj.isAttacking = true;
        obj.attackCooldown = 60; // Cooldown in frames
    }
}

export function doShoot(obj) {
    if (obj.currentShootingCooldown <= 0 && obj.currentShootingCapacity > 0) {
        let bullet = new Bullet(obj.x, obj.y, 15, obj.facingRight, obj.bullet_damage, (obj == gameState.player1) ? gameState.player2: gameState.player1);
        gameState.bullets.push(bullet);
        obj.currentShootingCooldown = obj.shootingCooldown;
		obj.currentShootingCapacity--;
    }
}

export function updateBullet(obj) {

	if (obj.x + obj.spriteSize <= 0 || obj.x >= CONFIG.width) {
		// Check for Border collisions

		let i = gameState.bullets.indexOf(obj);
        gameState.bullets.splice(i, 1);

	} else if (checkCollision(obj, obj.target)) {
		// Check for collision with target

		if (obj.target == gameState.player1) {
			gameState.player1.health -= obj.damage;
		} else if (obj.target == gameState.player2) {
			gameState.player2.health -= obj.damage;
		}

		let i = gameState.bullets.indexOf(obj);
        gameState.bullets.splice(i, 1);

	}  else {
		// Else move the bullet

		obj.x += obj.speed;
		obj.y += obj.ySpeed;
		
	}
}

class Bullet {
    constructor(x, y, speed, right, damage, target) {
        this.x = x;
        this.y = y;
        this.speed = speed;
		this.ySpeed = Math.random() * 2 - 1;

		if (!right) {
			this.speed = speed * -1;
		}

        this.spriteSize = 20;
		this.damage = damage;

		this.target = target;

		this.width = this.spriteSize;
		this.height = this.spriteSize;

        this.sprite = new Image();
        this.sprite.src = 'assets/bullet.svg';
    }
}