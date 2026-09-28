import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('shuffle')
	.setDescription('Embaralha a ordem das músicas na fila.');

export async function execute(interaction, client) {
	await interaction.deferReply();

	const player = client.manager.players.get(interaction.guild.id);

	if (!player || player.queue.length <= 1) {
		return interaction.editReply({ content: '❌ Não há músicas suficientes na fila para embaralhar.' });
	}

	player.queue.shuffle();

	const embed = new EmbedBuilder()
		.setColor('Green')
		.setDescription('🔀 **A fila de músicas foi embaralhada!**');

	return interaction.editReply({ embeds: [embed] });
}
