import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { getRandomNumber } from '../../Utils/random.js';

export const data = new SlashCommandBuilder()
	.setName('1d6')
	.setDescription(
		'Annie joga um 1d6 pra você. Quem sabe a sorte dela seja melhor do que a sua.',
	);

export async function execute(interaction) {
	await interaction.deferReply();

	try {
		const choices = ['1', '2', '3', '4', '5', '6'];
		const randomChoice = getRandomNumber(choices.length) + 1;
		const title = '🎲 | Um dado foi arremessado...';

		const colors = {
			1: 'Green',
			2: 'Orange',
			3: 'Aqua',
			4: 'White',
			5: 'Red',
			6: 'Purple',
		};

		const color = colors[randomChoice] || 'White';

		const embed = new EmbedBuilder()
			.setTitle(title)
			.setColor(color)
			.setDescription(`Seu número é **${randomChoice}**!`);

		await interaction.editReply({ embeds: [embed] });
	} catch (err) {
		console.error(err);
		const errorEmbed = new EmbedBuilder()
			.setColor('Red')
			.setDescription('⛔ | Alguma coisa deu errado ao arremessar o dado...');

		if (interaction.deferred || interaction.replied) {
			await interaction.editReply({ embeds: [errorEmbed] });
		} else {
			await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
		}
	}
}
