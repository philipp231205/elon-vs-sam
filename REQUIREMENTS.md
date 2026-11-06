# Requirements

Elon vs. Sam is a browser game written in JavaScript.

## Game Modes

### Singleplayer

The player chooses Elon or Sam and fights against an AI-controlled opponent.

### Multiplayer

Player 1 chooses Elon or Sam. Player 2 plays as the remaining character.

## Player Actions

### Movement

Players can walk left and right and jump upward.

### Melee Attack

Players can perform a melee attack. The attack deals damage when the opponent is within its hitbox.

### Shooting

Players can fire projectiles in the direction they are facing. A projectile that hits the opponent deals damage unless the opponent is blocking.

### Blocking

Players can enter a blocking state. While blocking, they cannot move and take no damage from projectiles.

## Match End

The match ends as soon as either player's hit points reach zero or below.