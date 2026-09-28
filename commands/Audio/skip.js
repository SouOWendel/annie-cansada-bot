import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('skip')
	.setDescription('Pula a música que está tocando agora.');

export async function execute(interaction, client) {
	await interaction.deferReply();

	const player = client.manager.players.get(interaction.guild.id);

	if (!player || !player.queue.current) {
		return interaction.editReply({ content: '❌ Não há nenhuma música tocando no momento.' });
	}

	player.skip();

	const embed = new EmbedBuilder()
		.setColor('Green')
		.setDescription('⏭️ **Música pulada com sucesso!**');

	return interaction.editReply({ embeds: [embed] });
}
