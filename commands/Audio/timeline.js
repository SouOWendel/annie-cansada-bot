import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('timeline')
	.setDescription('Avance ou retroceda a música atual.')
	.addSubcommand((subcommand) =>
		subcommand
			.setName('avancar')
			.setDescription('Avança o som em segundos.')
			.addIntegerOption((option) =>
				option
					.setName('segundos')
					.setDescription('Segundos para avançar.')
					.setMinValue(1)
					.setRequired(true),
			),
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName('retroceder')
			.setDescription('Retrocede o som em segundos.')
			.addIntegerOption((option) =>
				option
					.setName('segundos')
					.setDescription('Segundos para retroceder.')
					.setMinValue(1)
					.setRequired(true),
			),
	);

export async function execute(interaction, client) {
	await interaction.deferReply();

	const player = client.manager.players.get(interaction.guild.id);
	const subcommand = interaction.options.getSubcommand();
	const seconds = interaction.options.getInteger('segundos');

	if (!player || !player.queue.current) {
		return interaction.editReply({ content: '❌ Não há nenhuma música tocando no momento.' });
	}

	const currentPosition = player.position; // Em milissegundos
	const seekMs = seconds * 1000;

	let newPosition = subcommand === 'avancar' ? currentPosition + seekMs : currentPosition - seekMs;
	if (newPosition < 0) newPosition = 0;

	player.seek(newPosition);

	const embed = new EmbedBuilder()
		.setColor('Green')
		.setDescription(`⏩ **Posição da música alterada para:** \`${Math.floor(newPosition / 1000)}s\``);

	return interaction.editReply({ embeds: [embed] });
}
