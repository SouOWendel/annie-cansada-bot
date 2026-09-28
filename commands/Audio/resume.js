import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('resume')
	.setDescription('Despausa a reprodução da música.');

export async function execute(interaction, client) {
	await interaction.deferReply();

	const player = client.manager.players.get(interaction.guild.id);

	if (!player) {
		return interaction.editReply({ content: '❌ O player não está ativo no servidor.' });
	}

	if (!player.paused) {
		return interaction.editReply({ content: '⚠️ O player já está tocando normalmente.' });
	}

	player.pause(false);

	const embed = new EmbedBuilder()
		.setColor('Green')
		.setDescription('▶️ **A música foi despausada!**');

	return interaction.editReply({ embeds: [embed] });
}
