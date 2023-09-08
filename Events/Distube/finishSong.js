// eslint-disable-next-line no-unused-vars
import { Client, EmbedBuilder } from 'discord.js';
import { Events } from 'distube';
import { generalErrorEmbed } from '../../Data/embeds.js';

// https://www.appsloveworld.com/discordjs/100/26/discord-js-music-bot-not-working-distube-framework
export default {
	name: Events.FINISH_SONG,
	distube: true,
	// eslint-disable-next-line no-unused-vars
	execute(queu_e) {
		try {
			const embed = new EmbedBuilder();
			const queue = queu_e.distube.getQueue(queu_e.id);
			if (!queue) {
				embed.setColor('Red').setDescription('Não há queue ativa no momento.');
				return queu_e.textChannel.send({ embeds: [embed], ephemeral: true });
			}

			if (!queue.songs[1]) {
				return console.log('Acabou a queue, não há música seguinte.');
			}

			const song = queue.songs[1];
			embed.setColor('Blue')
				.setAuthor({
					name: `Tocando agora: ${ (song.name.length <= 35) ? `${song.name}` : `${song.name.slice(0, 35).concat('...')}` }`,
					iconURL: 'https://media.tenor.com/wiMyvo8ZFN0AAAAj/pinguim-penguin.gif',
				});
			return queu_e.textChannel.send({ embeds: [embed], ephemeral: true });
		} catch (err) {
			console.log(err);
			generalErrorEmbed.description = 'Ocorreu um erro, verifique o seu comando...';
			return queu_e.textChannel.send({ embeds: [generalErrorEmbed], ephemeral: true });
		}
	},
};