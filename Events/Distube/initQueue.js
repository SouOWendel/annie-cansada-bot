export default {
	name: 'playerCreate',
	execute(player) {
		console.log(`Player criado para o servidor ${player.guildId}.`);
	},
};