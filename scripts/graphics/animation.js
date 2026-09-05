function setAnimation(obj, animationName) {
    // Only change if it's a different animation
    if (obj.currentAnimation !== animationName && obj.animations[animationName]) {
        obj.currentAnimation = animationName;
        obj.currentFrame = 0;
        obj.frameTimer = 0;
    }
}

export function determineAnimation(obj) {
    // Priority system: higher priority animations override lower ones
    if (obj.attackCooldown > 0) {
        setAnimation(obj, 'attack');
    } else if (obj.hitStunTime > 0) {
        setAnimation(obj, 'hit');
    } else if (obj.isJumping) {
        setAnimation(obj, 'jump');
    } else if (Math.abs(obj.velX) > 0.1) {
        setAnimation(obj, 'walk');
    } else {
        setAnimation(obj, 'idle');
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