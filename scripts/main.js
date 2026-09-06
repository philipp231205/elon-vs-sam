import { CONFIG, gameState } from './config.js';

// UI
import { toggleSinglePlayer } from './ui/toggleSinglePlayer.js';
import { updateHealthBar } from './ui/healthBar.js';

// Graphics
import { render } from './graphics/draw.js';

// Physics
import { checkCollision } from './physics/collisions.js';
import { getBodyBox, getAttackBox } from './physics/boxes.js';

// Controls
import { update } from './controls/playerControls.js';

// AI
import { updateAI } from './ai/ai.js';

// Game Controller

// Character Class
class Character {
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

// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = CONFIG.width;
canvas.height = CONFIG.height;

// Resizing
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    CONFIG.width = window.innerWidth;
    CONFIG.height = window.innerHeight;
    render(player1, player2, ctx, canvas);
});

// Game Objects

let singleplayer = true;
let player1 = null;
let player2 = null;
let timer = null;

// Input Handling

const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});
window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Start Battle

function startBattle(player) {
    document.getElementById('SelectionScreen').style.display = 'none';
    document.getElementById('hud').style.display = 'flex';
    document.getElementById('timer').textContent = CONFIG.battleTime;

    let idP1;
    let idP2;

    if (player === 'Elon Musk') {
        gameState.selections.player1 = 'Elon Musk';
        gameState.selections.player2 = 'Sam Altman';

        idP1 = 1;
        idP2 = 2;
    } else {
        gameState.selections.player1 = 'Sam Altman';
        gameState.selections.player2 = 'Elon Musk';

        idP1 = 2;
        idP2 = 1;
    }

    gameState.phase = 'battle';
    if (player === 'Elon Musk') {
        player1 = new Character(false, idP1, CONFIG.characters.elon.name, CONFIG.characters.elon.health, CONFIG.characters.elon.attack, CONFIG.characters.elon.speed, CONFIG.characters.elon.jump_power, CONFIG.characters.elon.ai_decisionCooldown, CONFIG.playerwidth, CONFIG.playerheight);
        player2 = new Character(singleplayer, idP2, CONFIG.characters.sam.name, CONFIG.characters.sam.health, CONFIG.characters.sam.attack, CONFIG.characters.sam.speed, CONFIG.characters.sam.jump_power, CONFIG.characters.sam.ai_decisionCooldown, CONFIG.playerwidth, CONFIG.playerheight);
    } else {
        player1 = new Character(singleplayer, idP1, CONFIG.characters.elon.name, CONFIG.characters.elon.health, CONFIG.characters.elon.attack, CONFIG.characters.elon.speed, CONFIG.characters.elon.jump_power, CONFIG.characters.elon.ai_decisionCooldown, CONFIG.playerwidth, CONFIG.playerheight);
        player2 = new Character(false, idP2, CONFIG.characters.sam.name, CONFIG.characters.sam.health, CONFIG.characters.sam.attack, CONFIG.characters.sam.speed, CONFIG.characters.sam.jump_power, CONFIG.characters.sam.ai_decisionCooldown, CONFIG.playerwidth, CONFIG.playerheight);
    }

    player1.x = CONFIG.width * 0.25 - player1.width / 2;
    player1.y = CONFIG.height - player1.height;

    player2.x = CONFIG.width * 0.75 - player2.width / 2;
    player2.y = CONFIG.height - player2.height;

    // Start Timer

    timer = setInterval(() => {
        gameState.timeRemaining--;
        document.getElementById('timer').textContent = gameState.timeRemaining;

        if (gameState.timeRemaining <= 0) {
            endBattle('time');
        }
    }, 1000);

    gameLoop();
}


// Game Loop
function gameLoop() {
    if (gameState.phase !== 'battle') return;

    update(player1, player2, CONFIG, keys);
    update(player2, player1, CONFIG, keys);

    // Check for attacks
    if (player1.isAttacking) {
        const attackBox = getAttackBox(player1);
        if (checkCollision(attackBox, getBodyBox(player2))) {
            player2.health -= player1.attack;
            player1.isAttacking = false;
        }
    } else if (player2.isAttacking) {
        const attackBox = getAttackBox(player2);
        if (checkCollision(attackBox, getBodyBox(player1))) {
            player1.health -= player2.attack;
            player2.isAttacking = false;
        }
    }

    //player1.health--; // TEMP DAMAGE

    updateHealthBar('player1', player1);
    updateHealthBar('player2', player2);

    // Check for end conditions
    if (player1.health <= 0) {
        endBattle('p2');
    } else if (player2.health <= 0) {
        endBattle('p1');
    }

    render(player1, player2, ctx, canvas);
    requestAnimationFrame(gameLoop);
}

// End Battle
function endBattle(reason) {

    clearInterval(timer);
    gameState.phase = 'gameover';

    let winner;
    if (reason === 'p1') {
        player2.health = 0;
        updateHealthBar('player2', player2);
        winner = 'Elon Musk wins!';
    } else if (reason === 'p2') {
        player1.health = 0;
        updateHealthBar('player1', player1);
        winner = 'Sam Altman wins!';
    } else {
        winner = 'It\'s a Draw!';
    }

    document.getElementById('gameOverScreen').style.display = 'flex';
    document.getElementById('winnerName').textContent = winner;
}

// Event handlers

const selectSinglePlayer = document.querySelector('#SelectionSingle');
const selectMultiPlayer = document.querySelector('#SelectionMultiplayer')

selectSinglePlayer.addEventListener('click', (event) => {
    singleplayer = toggleSinglePlayer(singleplayer);
});

selectMultiPlayer.addEventListener('click', (event) => {
    singleplayer = toggleSinglePlayer(singleplayer);
});

const chooseP1S = document.querySelector('#P1S');
const chooseP2S = document.querySelector('#P2S');
const chooseP1M = document.querySelector('#P1M');
const chooseP2M = document.querySelector('#P2M');

chooseP1S.addEventListener('click', (event) => {
    startBattle('Elon Musk');
});

chooseP2S.addEventListener('click', (event) => {
    startBattle('Sam Altman');
});

chooseP1M.addEventListener('click', (event) => {
    startBattle('Elon Musk');
});

chooseP2M.addEventListener('click', (event) => {
    startBattle('Sam Altman');
});