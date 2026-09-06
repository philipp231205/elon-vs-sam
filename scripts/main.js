import { CONFIG, gameState, Character } from './config.js';

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
import { startBattle } from './gameController/startBattle.js';

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
    startBattle('Elon Musk', CONFIG, gameState, singleplayer, keys, ctx, canvas);
});

chooseP2S.addEventListener('click', (event) => {
    startBattle('Sam Altman', CONFIG, gameState, singleplayer, keys, ctx, canvas);
});

chooseP1M.addEventListener('click', (event) => {
    startBattle('Elon Musk', CONFIG, gameState, singleplayer, keys, ctx, canvas);
});

chooseP2M.addEventListener('click', (event) => {
    startBattle('Sam Altman', CONFIG, gameState, singleplayer, keys, ctx, canvas);
});