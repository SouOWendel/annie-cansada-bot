export default {
	name: 'guildCreate',
	async execute(guild, client) {
		console.log(`Bot adicionado ao servidor: ${guild.name} (${guild.id})`);
	},
};