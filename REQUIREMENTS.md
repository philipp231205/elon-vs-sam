# Requirements

Elon vs. Sam is a browser game written in Javascript.

## Game Design

There are 2 modes: Singleplayer and Multiplayer

### Singeplayer

The player chooses a character (Elon or Sam) and fights against an AI-controlled enemy.

### Multiplayer

Player 1 chooses a character, and fights against Player 2, who gets the character that wasn't picked by Player 1.

### Control

Walk: The Player can walk left or right.

Jump: The Player can jump upwards.

Melee: The Player can attack the other Player if it is in proximity. This deals damage to the other player, if he is within the hitbox.

Shooting: The Player can shoot objects in the direction he is pointing. If an object hits the other Player, it deals damage if this Player is currently not blocking.

Blocking: A Player can go into Block mode. In this mode, he can't receive damage by shooting. In Block mode, a Player can't move.

### End

The Game is over as soon as one Player has 0 or less Hitpoints.