// eslint-disable-next-line no-unused-vars
import { Client } from 'discord.js';
import { Events } from 'distube';

// https://www.appsloveworld.com/discordjs/100/26/discord-js-music-bot-not-working-distube-framework
export default {
	name: Events.PLAY_SONG,
	distube: true,
	// eslint-disable-next-line no-unused-vars
	execute(client) {
		// const queue = client.distube.getQueue(client.id);
		// if (queue.songs !== undefined) {
		//     console.log(queue.songs.song.streamURL);
		// }
		// console.log(queue.songs);
		// console.log(ExtractorPlugin.getStreamURL('https://www.youtube.com/watch?v=2vrwkXjdjEs'));
	},
};