import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { PIADAS_PERGUNTA_RESPOSTA } from '../../Data/dataPiadas.js';
import { getRandomNumber } from '../../utils.js';

export const data = new SlashCommandBuilder()
	.setName('piada')
	.setDescription('A Annie te contará uma piada de seu amplo repertório.');

export async function execute(interaction) {

    const randomJoke = getRandomNumber(PIADAS_PERGUNTA_RESPOSTA.length);

    const embed = new EmbedBuilder()
    .setColor(2216478)
    .setAuthor({ name: 'Piadas e Respostas', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
    .addFields(
        { name: PIADAS_PERGUNTA_RESPOSTA[randomJoke][0], value: PIADAS_PERGUNTA_RESPOSTA[randomJoke][1] },
    )
    .setThumbnail('https://i.imgur.com/AfFp7pu.png')
    .setFooter({ text: 'Clique no spoiler para revelar a resposta da piada.', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

    await interaction.reply({
        embeds: [embed],
    });
}
