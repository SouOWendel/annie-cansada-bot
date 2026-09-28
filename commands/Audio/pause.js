import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('pause')
	.setDescription('Pausa a música atual.');

export async function execute(interaction, client) {
	await interaction.deferReply();

	const player = client.manager.players.get(interaction.guild.id);

	if (!player) {
		return interaction.editReply({ content: '❌ O player não está ativo no servidor.' });
	}

	if (player.paused) {
		return interaction.editReply({ content: '⚠️ O player já está pausado. Use `/resume` para despausar.' });
	}

	player.pause(true);

	const embed = new EmbedBuilder()
		.setColor('Yellow')
		.setDescription('⏸️ **A música foi pausada!**');

	return interaction.editReply({ embeds: [embed] });
}
