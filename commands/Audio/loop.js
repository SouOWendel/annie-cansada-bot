import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('loop')
	.setDescription('Altera o modo de repetição de música ou da fila.')
	.addStringOption((option) =>
		option
			.setName('modo')
			.setDescription('Escolha o modo de repetição')
			.addChoices(
				{ name: 'Desativado', value: 'none' },
				{ name: 'Música Atual', value: 'track' },
				{ name: 'Fila Inteira', value: 'queue' },
			)
			.setRequired(true),
	);

export async function execute(interaction, client) {
	await interaction.deferReply();

	const player = client.manager.players.get(interaction.guild.id);
	const mode = interaction.options.getString('modo');

	if (!player) {
		return interaction.editReply({ content: '❌ O player não está ativo no servidor.' });
	}

	player.setLoop(mode);

	const modeNames = {
		none: 'Desativado',
		track: 'Música Atual',
		queue: 'Fila Inteira',
	};

	const embed = new EmbedBuilder()
		.setColor('Green')
		.setDescription(`🔁 **Modo de repetição alterado para:** \`${modeNames[mode]}\``);

	return interaction.editReply({ embeds: [embed] });
}
