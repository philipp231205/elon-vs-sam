export function updateHealthBar(player, character) {
    const healtPercent = (character.health / character.maxHealth) * 100;
    document.getElementById(`${player}-health`).style.width = `${healtPercent}%`;
}