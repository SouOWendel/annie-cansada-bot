import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('volume')
	.setDescription('Ajusta o volume do som.')
	.addIntegerOption((option) =>
		option
			.setName('quantidade')
			.setDescription('Volume de 1 a 100.')
			.setMinValue(1)
			.setMaxValue(100)
			.setRequired(true),
	);

export async function execute(interaction, client) {
	await interaction.deferReply();

	const player = client.manager.players.get(interaction.guild.id);
	const vol = interaction.options.getInteger('quantidade');

	if (!player) {
		return interaction.editReply({ content: '❌ O player não está ativo no servidor.' });
	}

	player.setVolume(vol);

	const embed = new EmbedBuilder()
		.setColor('Green')
		.setDescription(`🔊 **Volume ajustado para ${vol}%!**`);

	return interaction.editReply({ embeds: [embed] });
}
