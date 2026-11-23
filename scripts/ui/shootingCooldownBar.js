export function shootingCooldownBar(player, obj) {
	const shootingCooldownPercent = (obj.currentShootingCapacity / obj.shootingCapacity) * 100;
	document.getElementById(`${player}-shootingCooldown`).style.width =  `${shootingCooldownPercent}%`;
}