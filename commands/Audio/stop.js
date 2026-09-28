import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('stop')
	.setDescription('Para a música, limpa a fila e desconecta do canal de voz.');

export async function execute(interaction, client) {
	await interaction.deferReply();

	const player = client.manager.players.get(interaction.guild.id);

	if (!player) {
		return interaction.editReply({ content: '❌ Não há nenhum player ativo no servidor.' });
	}

	player.destroy();

	const embed = new EmbedBuilder()
		.setColor('Red')
		.setDescription('🛑 **A reprodução foi interrompida e o player foi desconectado!**');

	return interaction.editReply({ embeds: [embed] });
}
