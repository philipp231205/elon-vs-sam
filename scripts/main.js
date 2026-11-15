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

gameState.canvas = canvas;
gameState.ctx = ctx;

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

gameState.keys = keys;

// Event handlers

const playerSelection = document.querySelector('.SelectionScreenTabBar');

const contPanelSingle = document.getElementById('controls-single');
const contPanelMutli = document.getElementById('controls-multi');

playerSelection.addEventListener('click', (event) => {
    const s = event.target.closest('.SelectionScreenTab');
    if (!s || !playerSelection.contains(s)) return;

    toggleSinglePlayer();
});

const p1Selection = document.querySelector('.SelectionScreen');

p1Selection.addEventListener('click', (event) => {
    const p = event.target.closest('.card');
    if (!p || !p1Selection.contains(p)) return;

    startBattle(p.dataset.p1, keys, ctx, canvas);
});