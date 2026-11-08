// Collision check of 2 rects
export function checkCollision(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.playerWidth &&
        rect1.x + rect1.playerWidth > rect2.x &&
        rect1.y < rect2.y + rect2.playerHeight &&
        rect1.y + rect1.playerHeight > rect2.y
    );
}