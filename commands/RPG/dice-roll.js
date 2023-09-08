import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { getRandomNumber } from '../../Utils/random.js';

export const data = new SlashCommandBuilder()
	.setName('1d6')
	.setDescription('Annie joga um 1d6 pra você. Quem sabe a sorte dela seja melhor do que a sua.');

export async function execute(interaction) {

	const choices = ['1', '2', '3', '4', '5', '6'];
	const randomChoice = getRandomNumber(choices.length) + 1;
	const title = '🎲 | Um dado foi arremessado...';
	let color = '';

	const embed = new EmbedBuilder();

	try {
		if (randomChoice == 1) {
			color = 'Green';
		} else if (randomChoice == 2) {
			color = 'Orange';
		} else if (randomChoice == 3) {
			color = 'Aqua';
		} else if (randomChoice == 4) {
			color = 'White';
		} else if (randomChoice == 5) {
			color = 'Red';
		} else if (randomChoice == 6) {
			color = 'Purple';
		}
		embed.setTitle(title).setColor(color).setDescription(`Seu número é **${randomChoice}**!`);
		return interaction.reply({ embeds: [embed] });
	} catch (err) {
		console.log(err);

		embed.setColor('Red').setDescription('⛔ | Alguma coisa deu errado...');

		return interaction.reply({ embeds: [embed], ephemeral: true });
	}
}