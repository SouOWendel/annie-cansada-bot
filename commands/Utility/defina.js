/* eslint-disable brace-style */
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { capitalize } from '../../utils.js';
// import { request } from 'undici';

// API de Dicionário utilizada aqui: https://github.com/ThiagoNelsi/dicio-api/
// https://old.discordjs.dev/#/docs/builders/main/class/SlashCommandBuilder?scrollTo=options
export const data = new SlashCommandBuilder()
	.setName('defina')
	.setDescription('Busque a definição de uma palavra no amplo conhecimento que a Annie guarda.')
	.addStringOption(option => option.setName('palavra')
		.setDescription('Qual palavra você deseja buscar o significado?')
		.setRequired(true));

export async function execute(interaction) {

	const term = interaction.options.getString('palavra');

	const url = `https://dicio-api-ten.vercel.app/v2/significados/${term}`;
	console.log('Palavra pesquisada em: ' + url);
	const response = await fetch(url);
	const result = await response.json();

	console.log('Quantidade de Definições: ' + result[0].meanings.length);

	const embed = new EmbedBuilder()
		.setColor(0xEFFF00)
		.setTitle('Dicionário de Palavras da Annie!')
		.setURL(`https://www.dicio.com.br/livro/${term}`)
		.setDescription(`A palavra a ser procurada é: **${capitalize(term)}**.`);

	for (let a = 0; a < result.length; a++) {
		for (let b = 0; b < result[a].meanings.length; b++) {
			embed.addFields({ name: result[a].partOfSpeech, value: '• ' + result[a].meanings[b] });
		}

		if (result[0].etymology != '') {
			embed.addFields({ name: 'Etimologia', value: result[a].etymology });
		}
	}

	await interaction.reply({ embeds: [embed] });
}