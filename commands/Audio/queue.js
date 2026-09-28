import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('queue')
	.setDescription('Exibe a fila de músicas atual.');

export async function execute(interaction, client) {
	await interaction.deferReply();

	const player = client.manager.players.get(interaction.guild.id);

	if (!player || !player.queue.current) {
		return interaction.editReply({ content: '❌ Não há nenhuma música tocando no momento.' });
	}

	const current = player.queue.current;
	const tracks = player.queue.slice(0, 10);

	const queueList = tracks.map((track, i) => `${i + 1}. [${track.title}](${track.uri}) - \`${track.author}\``).join('\n');

	const embed = new EmbedBuilder()
		.setColor(3501486)
		.setTitle(`🎶 Fila de Reprodução - ${interaction.guild.name}`)
		.setDescription(`**Tocando agora:**\n[${current.title}](${current.uri}) - \`${current.author}\`\n\n**Próximas:**\n${queueList || 'Nenhuma música na fila.'}`)
		.setFooter({ text: `Total na fila: ${player.queue.length} música(s)` });

	return interaction.editReply({ embeds: [embed] });
}
