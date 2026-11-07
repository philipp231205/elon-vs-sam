import { gameState } from "../config.js";

function setAnimation(obj, animationName) {
    // Only change if it's a different animation
    if (obj.currentAnimation !== animationName && obj.animations[animationName]) {
        obj.currentAnimation = animationName;
        obj.currentFrame = 0;
        obj.frameTimer = 0;
    }
}

export function determineAnimation(obj, keys) {
    // Priority system: higher priority animations override lower ones

    if (obj.id == 1) {
        if (keys['Shift']) {
            setAnimation(obj, 'block');
        } else if (keys['Control']) {
            setAnimation(obj, 'shoot');
        } else if (keys[' ']) {
            setAnimation(obj, 'attack');
        } else if (keys['w']) {
            setAnimation(obj, 'jump');
        } else if (keys['a'] || keys['d']) {
            setAnimation(obj, 'walk');
        } else {
            setAnimation(obj, 'idle');
        }
    } else if (obj.id == 2) {
        if (keys['5']) {
            setAnimation(obj, 'block');
        } else if (keys['Enter']) {
            setAnimation(obj, 'shoot');
        } else if (keys['ArrowDown']) {
            setAnimation(obj, 'attack');
        } else if (keys['8']) {
            setAnimation(obj, 'jump');
        } else if (keys['4'] || keys['6']) {
            setAnimation(obj, 'walk');
        } else {
            setAnimation(obj, 'idle');
        }
    }
}

export function updateAnimation(obj) {
    const anim = obj.animations[obj.currentAnimation];
    if (!anim) return;
    
    obj.frameTimer++;
    
    // Time to switch to next frame?
    if (obj.frameTimer >= obj.frameDelay) {
        obj.frameTimer = 0;
        obj.currentFrame++;
        
        // Loop or stop at end
        if (obj.currentFrame >= anim.frames) {
            if (anim.loop) {
                obj.currentFrame = 0;
            } else {
                obj.currentFrame = anim.frames - 1; // Stay on last frame
            }
        }
    }
}

export class Anim {
	constructor(x, y, path) {
		this.x = x;
		this.y = y;
		this.frames = 30;

        this.spriteSize = 192;
		this.width = this.spriteSize;
		this.height = this.spriteSize;

        this.sprite = new Image();
        this.sprite.src = path;
	}
}

export function updateAnim(obj) {
    if (obj.frames > 0) {
        obj.frames--;
    } else {
        let i = gameState.anims.indexOf(obj);
        gameState.anims.splice(i, 1);
    }
}