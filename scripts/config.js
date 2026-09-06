export const CONFIG = {
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
            speed: window.innerWidth / 220, // SPEED PARAMETER
            jump_power: window.innerHeight / 40, // JUMP POWER PARAMETER
            ai_decisionCooldown: 30
        },
        sam: {
            name: 'Sam Altman',
            health: 350,
            attack: 15,
            speed: window.innerWidth / 200, // SPEED PARAMETER
            jump_power: window.innerHeight / 35, // JUMP POWER PARAMETER
            ai_decisionCooldown: 50
        }
    }
}

export const gameState = {
    phase: 'selection', // 'selection', 'battle', 'gameover'
    selections: {
        player1: null,
        player2: null
    },
    timeRemaining: CONFIG.battleTime || 120,
    winner: null
}

// Character Class
export class Character {
    constructor(isAI, id, name, health, attack, speed, jump_power, aiDefaultDecisionCooldown, playerWidth, playerHeight) {
        this.isAI = isAI;
        this.id = id;
        this.name = name;
        this.health = health;
        this.maxHealth = health;
        this.attack = attack;
        this.speed = speed;
        this.jump_power = jump_power;

        this.x = 0;
        this.y = 0;
        this.width = window.innerWidth * 0.25; // SPRITE WIDTH
        this.height = window.innerHeight * 0.5; // SPRITE HEIGHT

        this.playerWidth = playerWidth;
        this.playerHeight = playerHeight;

        this.velX = 0;
        this.velY = 0;

        this.isJumping = false;
        this.isAttacking = false;
        this.attackCooldown = 0;
        this.attackAnimationTime = 0;
        this.hitStunTime = 0;
        this.facingRight = true;

        // AI
        this.aiDecisionCooldown = 0;
        this.aiDefaultDecisionCooldown = aiDefaultDecisionCooldown || 30;
        this.aiWalking = false;
        this.aiWalkTarget = 0;
        this.aiJumping = false;
        this.aiAttacking = false;


        // Sprites
        this.spriteSheet = null;
        this.currentAnimation = 'idle';
        this.currentFrame = 0;
        this.frameTimer = 0;
        this.frameDelay = 5;

        this.animations = {
            idle: { row: 0, frames: 8, loop: true },
            walk: { row: 1, frames: 8, loop: true },
            jump: { row: 2, frames: 8, loop: false },
            attack: { row: 3, frames: 12, loop: false },
        };
        
        this.spriteWidth = 256;
        this.spriteHeight = 256;

        this.spriteSheet = new Image();
        this.spriteSheet.src = `assets/${this.name.toLowerCase().replace(' ', '')}.png`;
    }
}