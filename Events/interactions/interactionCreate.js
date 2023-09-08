// import { CommandInteraction } from 'discord.js';

export default {
	name: 'interactionCreate',
	async execute(interaction, client) {
		console.time('Tempo para execução do comando');
		if (!interaction.isChatInputCommand()) return;

		const command = client.commands.get(interaction.commandName);

		if (!command) {
			interaction.reply({ content: 'Comando inexistente.' });
		}

		try {
			await command.execute(interaction, client);
			console.timeEnd('Tempo para execução do comando');
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'Houve um erro durante a execução do comando!', ephemeral: true });
			} else {
				await interaction.reply({ content: 'Houve um erro durante a execução do comando!', ephemeral: true });
			}
		}
	},
};