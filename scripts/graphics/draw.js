function draw(obj, ctx) {
    //ctx.save();
    //ctx.fillStyle = obj.id == 1 ? 'red' : 'blue'; // DEBUG
    //ctx.fillRect(obj.x, obj.y, obj.playerWidth, obj.playerHeight); // DEBUG

    //let bodyOffset = this.playerWidth * 0.5; // DEBUG
    //if (!this.facingRight) {
    //	bodyOffset = -bodyOffset;
    //}

    //ctx.fillStyle = this.name === 'Elon Musk' ? 'green' : 'yellow'; // DEBUG
    //ctx.fillRect(this.x + bodyOffset, this.y, this.playerWidth, this.playerHeight * 0.5); // DEBUG

    drawSprite(obj, ctx);

    ctx.restore();
}

function drawSprite(obj, ctx) {
    const anim = obj.animations[obj.currentAnimation];
    if (!anim) return;
    
    // Calculate source position in sprite sheet
    const sourceX = obj.currentFrame * obj.spriteWidth;
    const sourceY = anim.row * obj.spriteHeight;

    // Calculation to center the sprite on the character's bodybox

    const middlexsprite = obj.width / 2;
    const middleysprite = obj.height / 2;

    const middlexbody = (obj.playerWidth / 2) + obj.x;
    const middleybody = (obj.playerHeight / 2) + obj.y;
    
    // Handle flipping for direction
    if (!obj.facingRight) {
        ctx.save();
        ctx.translate(middlexbody + middlexsprite, middleybody - middleysprite);
        ctx.scale(-1, 1);
        
        // Draw the sprite (flipped)
        ctx.drawImage(
            obj.spriteSheet,
            sourceX, sourceY, obj.spriteWidth, obj.spriteHeight,  // Source
            0, 0, obj.width, obj.height                           // Destination
        );
        
        ctx.restore();
    } else {
        // Draw the sprite (normal)
        ctx.drawImage(
            obj.spriteSheet,
            sourceX, sourceY, obj.spriteWidth, obj.spriteHeight,  // Source
            middlexbody - middlexsprite, middleybody - middleysprite, obj.width, obj.height                  // Destination
        );
    }
}

function drawItem(obj, ctx) {
    ctx.save();

    //ctx.fillStyle = 'green'; // DEBUG
    //ctx.fillRect(obj.x, obj.y, obj.playerWidth, obj.playerHeight); // DEBUG

    ctx.drawImage(
        obj.sprite,
        0, 0, obj.spriteSize, obj.spriteSize,
        obj.x, obj.y, obj.spriteSize, obj.spriteSize
    );

    ctx.restore();
}

// Render
export function render(player1, player2, ctx, canvas, bullets, anims) {
    // Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // FUTURE OBJECTS WILL BE DRAWN HERE TODO:

    // Draw Players
    draw(player1, ctx);
    draw(player2, ctx);

    bullets.forEach((item) => {
        drawItem(item, ctx);
    });

    anims.forEach((item) => {
        drawItem(item, ctx);
    });
}