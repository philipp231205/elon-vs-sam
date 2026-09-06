import { CONFIG, gameState } from './config.js';

// UI
import { toggleSinglePlayer } from './ui/toggleSinglePlayer.js';

// Graphics
import { render } from './graphics/draw.js';

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
    render(gameState.player1, gameState.player2, ctx, canvas);
});

// Input Handling

const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});
window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Event handlers

const playerSelection = document.querySelector('.SelectionScreen');

playerSelection.addEventListener('click', (event) => {
    const s = event.target.closest('.SelectionScreenTab');
    if (!s || !playerSelection.contains(s)) return;

    toggleSinglePlayer();
});

const chooseP1S = document.querySelector('#P1S');
const chooseP2S = document.querySelector('#P2S');
const chooseP1M = document.querySelector('#P1M');
const chooseP2M = document.querySelector('#P2M');

chooseP1S.addEventListener('click', (event) => {
    startBattle('Elon Musk', CONFIG, gameState, keys, ctx, canvas);
});

chooseP2S.addEventListener('click', (event) => {
    startBattle('Sam Altman', CONFIG, gameState, keys, ctx, canvas);
});

chooseP1M.addEventListener('click', (event) => {
    startBattle('Elon Musk', CONFIG, gameState, keys, ctx, canvas);
});

chooseP2M.addEventListener('click', (event) => {
    startBattle('Sam Altman', CONFIG, gameState, keys, ctx, canvas);
});