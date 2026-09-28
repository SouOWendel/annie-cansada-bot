import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('music')
	.setDescription('Painel de ajuda para os comandos de música da Annie.');

export async function execute(interaction) {
	await interaction.deferReply();

	const embed = new EmbedBuilder()
		.setColor(3501486)
		.setTitle('🎵 Comandos de Música (Lavalink)')
		.setDescription(
			'• `/play <query>`: Toca ou adiciona uma música/playlist à fila\n' +
			'• `/skip`: Pula para a próxima música\n' +
			'• `/pause`: Pausa a música atual\n' +
			'• `/resume`: Retoma a música\n' +
			'• `/stop`: Interrompe a reprodução e desconecta\n' +
			'• `/queue`: Mostra as músicas na fila\n' +
			'• `/nowplaying`: Exibe a música tocando agora\n' +
			'• `/volume <1-100>`: Ajusta o volume\n' +
			'• `/shuffle`: Embaralha a fila\n' +
			'• `/loop <modo>`: Altera a repetição da música/fila\n' +
			'• `/timeline`: Avança ou retrocede segundos da música',
		);

	return interaction.editReply({ embeds: [embed] });
}