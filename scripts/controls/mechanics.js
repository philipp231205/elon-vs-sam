import { CONFIG, gameState } from "../config.js";
import { checkCollision } from "../physics/collisions.js";
import { Anim } from "../graphics/animation.js";

export function doShoot(obj) {
    if (obj.currentShootingCooldown <= 0 && obj.currentShootingCapacity > 0) {
        let bullet = new Bullet(obj.x, obj.y, 15, obj.facingRight, obj.bullet_damage, (obj == gameState.player1) ? gameState.player2: gameState.player1);
        gameState.bullets.push(bullet);
        obj.currentShootingCooldown = obj.shootingCooldown;
		obj.currentShootingCapacity--;
    }
}

export function updateBullet(obj) {

	if (obj.x + (obj.playerWidth / 2) <= 0 || obj.x + (obj.playerWidth / 2) >= CONFIG.width) {
		// Check for Border collisions

		let x = 0;

		if (obj.facingRight) {
			x = obj.x - obj.width;
		} else {
			x = obj.x + obj.width;
		}

		let anim = new Anim(obj.x, obj.y, "assets/explosion.png");
		gameState.anims.push(anim);

		let i = gameState.bullets.indexOf(obj);
        gameState.bullets.splice(i, 1);

	} else if (checkCollision(obj, obj.target)) {
		let anim = new Anim(obj.x + (obj.right ? obj.playerWidth: -obj.playerWidth), obj.y, "assets/explosion.png");
		gameState.anims.push(anim);

		// Check for collision with target

		if (obj.target == gameState.player1 && !gameState.player1.isBlocking) {
			gameState.player1.health -= obj.damage;
		} else if (obj.target == gameState.player2 && !gameState.player2.isBlocking) {
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
		this.right = right;

        this.spriteSize = 192;
		this.damage = damage;

		this.target = target;

		this.width = this.spriteSize;
		this.height = this.spriteSize;

		this.playerWidth = this.spriteSize;
		this.playerHeight = this.spriteSize;

        this.sprite = new Image();

		if (!right) {
			this.speed = speed * -1;
			this.sprite.src = 'assets/fireball_left.png';
		} else {
			this.sprite.src = 'assets/fireball.png';
		}
    }
}