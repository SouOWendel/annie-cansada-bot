import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('nowplaying')
	.setDescription('Mostra detalhes da música que está tocando agora.');

export async function execute(interaction, client) {
	await interaction.deferReply();

	const player = client.manager.players.get(interaction.guild.id);

	if (!player || !player.queue.current) {
		return interaction.editReply({ content: '❌ Não há nenhuma música tocando no momento.' });
	}

	const current = player.queue.current;

	const embed = new EmbedBuilder()
		.setColor(3501486)
		.setTitle('🎶 Tocando Agora')
		.setDescription(`**[${current.title}](${current.uri})**\nAutor: \`${current.author}\``)
		.setThumbnail(current.thumbnail || null);

	return interaction.editReply({ embeds: [embed] });
}
