// eslint-disable-next-line no-unused-vars
import { Client } from 'discord.js';
import { Events } from 'distube';
// https://www.appsloveworld.com/discordjs/100/26/discord-js-music-bot-not-working-distube-framework
export default {
	name: Events.DELETE_QUEUE,
	distube: true,
	execute(client) {
		console.log('Player em espera...');
		console.time('Tempo expirado');
		console.log('Servidor ID: ' + client.id);
		// console.log(client.distube);

		setTimeout(() => {
			const queue = client.distube.getQueue(client.id);
			// if (!client.distube.queue.guild.members.me.voice.channelId) {
			//   return clearTimeout();
			// }

			if (queue !== undefined && queue.songs.length != 0) {
				// console.log('clear');
				// console.log('Tocando algo? ' + queue.duration);
				// console.log('Musicas na playlist:' + queue.songs.length);

				return clearTimeout();
			} else if (queue == undefined || queue.songs.length == 0) {
				client.distube.voices.leave(client.id);
				console.timeEnd('Tempo expirado');
			}
		}, 240000);
	},
};