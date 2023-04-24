/* eslint-disable brace-style */
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
// import { request } from 'undici';

// API de Dicionário utilizada aqui: https://github.com/ThiagoNelsi/dicio-api/
// https://old.discordjs.dev/#/docs/builders/main/class/SlashCommandBuilder?scrollTo=options
export const data = new SlashCommandBuilder()
	.setName('define')
	.setDescription('Busque a definição de uma palavra no amplo conhecimento que a Annie guarda.')
	.addStringOption(option => option.setName('term')
		.setDescription('Qual palavra você deseja buscar o significado?')
		.setRequired(true));

export async function execute(interaction) {
    // const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

		const term = interaction.options.getString('term');
		// const query = new URLSearchParams({ term });

		const url = `https://dicio-api-ten.vercel.app/v2/significados/${term}`;
		console.log(url);
			const response = await fetch(url);
			const result = await response.json();
			// console.log(result);
			// console.log('JSON:' + JSON.stringify(result));

		// Definições
		let allDefine = '';
		for (let i = 0; i < result[0].meanings.length; i++) {
			console.log(result[0].meanings[i]);
			allDefine = allDefine + JSON.stringify(result[0].meanings[i]);
		}
		console.log('Quantidade de Definições: ' + result[0].meanings.length);
		console.log('aaa \n' + 'bbb \n');
		console.log(allDefine);
			// const teste = JSON.loads(result);

		// if (!list.length) {
		// 	return interaction.editReply(`No results found for **${term}**.`);
		// }

		// const [answer] = list;

		const firstLetter = term.charAt(0);

		const firstLetterCap = firstLetter.toUpperCase();

		const remainingLetters = term.slice(1);

		const capitalizedWord = firstLetterCap + remainingLetters;

		const embed = new EmbedBuilder()
			.setColor(0xEFFF00)
			.setTitle('A definição da palavra: ' + capitalizedWord)
			.setURL(`https://www.dicio.com.br/livro/${term}`)
			.addFields(
				{ name: 'Classificação', value: result[0].partOfSpeech },
				{ name: 'Definição', value: allDefine },
				{ name: 'Etimologia', value: result[0].etymology },
			);
	await interaction.reply({ embeds: [embed] });
}