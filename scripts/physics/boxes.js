// Creates a rect for the body (hurtbox) — person occupies ~25% of sprite width (centered) and ~90% of sprite height (starting 5% from top)
export function getBodyBox(obj) {
    return {
        x: obj.x,
        y: obj.y,
        width: obj.playerWidth,
        height: obj.playerHeight
    };
}

// AttackBox is the top 50% height of the bodybox, starts at the x center and has the same with as the bodybox, but moved in the facing direction
export function getAttackBox(obj) {
    let bodyOffset = obj.playerWidth * 0.5;
    if (!obj.facingRight) {
        bodyOffset = -bodyOffset;
    }
    const attackWidth = obj.playerWidth;
    const boxY = obj.y;
    const boxH = obj.playerHeight * 0.5;

    return {
        x: obj.x + bodyOffset,
        y: boxY,
        width: attackWidth,
        height: boxH
    };
}