import { doShoot } from "./controls/mechanics.js";

export const CONFIG = {
	fps: 60,
    width: window.innerWidth,
    height: window.innerHeight,
    playerwidth: window.innerWidth * 0.1,
    playerheight: window.innerHeight * 0.4,
    battleTime: 120, // seconds
    gravity: 0.5,
    characters: {
        elon: {
            name: 'Elon Musk',
            health: 370,
            attack: 17,
            speed: 3, // Seconds to cross map
            jump_power: window.innerHeight / 40, // JUMP POWER PARAMETER
            shootingCooldown: 5,
            ai_decisionCooldown: 30,
			bullet_damage: 20,
			shootingCapacity: 10,
			shootingReload: 100
        },
        sam: {
            name: 'Sam Altman',
            health: 350,
            attack: 15,
            speed: 2.5, // Seconds to cross map
            jump_power: window.innerHeight / 35, // JUMP POWER PARAMETER
            shootingCooldown: 5,
            ai_decisionCooldown: 50,
			bullet_damage: 30,
			shootingCapacity: 10,
			shootingReload: 100
        }
    }
}

export const gameState = {
    phase: 'selection', // 'selection', 'battle', 'gameover'
    singleplayer: true, // True = Singeplayer, False = Multiplayer
    player1: null,
    player2: null,
	canvas: null,
	ctx: null,
	keys: null,
    selections: {
        player1: null,
        player2: null
    },
    timer: null,
    timeRemaining: CONFIG.battleTime || 120,
    winner: null,
    bullets: new Array(),
    anims: new Array(),
}

// Character Class
export class Character {
    constructor(isAI, id, character, fps) {
        this.isAI = isAI;
        this.id = id;
        this.name = character.name;
        this.health = character.health;
        this.maxHealth = character.health;
        this.attack = character.attack;
        this.speed = window.innerWidth / (character.speed * fps);
        this.jump_power = character.jump_power;

        this.x = 0;
        this.y = 0;
        this.width = window.innerWidth * 0.25; // SPRITE WIDTH
        this.height = window.innerHeight * 0.5; // SPRITE HEIGHT

        this.playerWidth = CONFIG.playerwidth;
        this.playerHeight = CONFIG.playerheight;

        this.velX = 0;
        this.velY = 0;

        this.isJumping = false;
        this.isAttacking = false;
        this.attackCooldown = 0;
        this.facingRight = true;

        this.isMovingRight = false;
        this.isMovingLeft = false;

        // Shooting
        this.isShooting = false;
        this.shootingCooldown = character.shootingCooldown;
        this.currentShootingCooldown = character.shootingCooldown;
		this.bullet_damage = character.bullet_damage;

		this.shootingCapacity = character.shootingCapacity;
		this.currentShootingCapacity = character.shootingCapacity;
		this.shootingReload = character.shootingReload;
		this.currentShootingReload = character.shootingReload;

		// Blocking
		this.isBlocking = false;

        // AI
		this.ai_maxDecisionCooldown = 15;
		this.ai_decisionCooldown = 15;
		this.aiWalkingLeft = false;
		this.aiWalkingRight = false;
		this.aiJumping = false;
		this.aiAttacking = false;
		this.aiShooting = false;
		this.aiBlocking = false;


        // Sprites
        this.spriteSheet = null;
        this.currentAnimation = 'idle';
        this.currentFrame = 0;
        this.frameTimer = 0;
        this.frameDelay = 5;

        this.animations = {
            idle: { row: 0, frames: 6, loop: true },
            walk: { row: 1, frames: 6, loop: true },
            jump: { row: 2, frames: 6, loop: false },
            attack: { row: 3, frames: 6, loop: true },
            shoot: { row: 4, frames: 6, loop: true },
            block: { row: 5, frames: 6, loop: true }
        };
        
        this.spriteWidth = 192;
        this.spriteHeight = 192;

        this.spriteSheet = new Image();
        this.spriteSheet.src = `assets/${this.name.toLowerCase().replace(' ', '')}.png`;
    }

    updatePlayer()  {

        // Moving
        // Reset Speed as it should only apply when button pressed
        this.velX = 0;

        // Apply speed
        if (this.isMovingRight && !this.isBlocking) {
            this.facingRight = true;
            this.velX += this.speed;
            this.isMovingRight = false;
        } else if (this.isMovingLeft && !this.isBlocking) {
            this.facingRight = false;
            this.velX -= this.speed;
            this.isMovingLeft = false;
        }

        // Check Boundaries
        if (this.x < 0) this.x = 0;
        if (this.x + this.playerWidth > CONFIG.width) this.x = CONFIG.width - this.playerWidth;

        // Jumping
        // Check jumping

        if (this.y + this.playerHeight > CONFIG.height) {
            this.y = CONFIG.height - this.playerHeight;
            this.isJumping = false;
            this.velY = 0;
        }

        // Update Jumping
        // If Player is Jumping, apply gravity, else apply jump power to vertical speed

        if (this.isJumping) {
            if (this.velY == 0 && !(this.y + this.playerHeight < CONFIG.height) && !this.isBlocking) {
                this.velY -= this.jump_power;
            } else {
                this.velY += CONFIG.gravity;
            }   
        }

        // Update position
        this.x += this.velX;
        this.y += this.velY;

		// Attacking
		if (this.isAttacking && !this.isBlocking) {
			if (this.attackCooldown <= 0) {
				this.attackCooldown = 60;
			} else if (this.attackCooldown > 0) {
				this.attackCooldown--;
			}

			if (this.attackCooldown == 0) {
				this.isAttacking = false;
			}
		} else {
			this.isAttacking = false;
		}

        // Shooting
        if (this.isShooting) {
            if (this.isBlocking) {
                this.isShooting = false;
            } else {
                doShoot(this);
            }
        }

        // Shooting cooldown
        if (this.currentShootingCooldown > 0) {
            this.currentShootingCooldown--;
        }

        if (this.currentShootingReload >= this.shootingReload) {
            this.currentShootingReload = 0;
            if (this.currentShootingCapacity < this.shootingCapacity) {
                this.currentShootingCapacity++;
            }
        } else {
            this.currentShootingReload++;
        }
    }
}