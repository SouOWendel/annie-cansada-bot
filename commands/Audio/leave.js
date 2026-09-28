import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('leave')
	.setDescription('Desconecta a Annie do canal de voz.');

export async function execute(interaction, client) {
	await interaction.deferReply();

	const player = client.manager.players.get(interaction.guild.id);

	if (!player) {
		return interaction.editReply({ content: '❌ Não estou conectada em nenhum canal de voz.' });
	}

	player.destroy();

	const embed = new EmbedBuilder()
		.setColor('Yellow')
		.setDescription('👋 **Desconectada do canal de voz!**');

	return interaction.editReply({ embeds: [embed] });
}
