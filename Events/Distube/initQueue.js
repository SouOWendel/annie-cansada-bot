/* eslint-disable no-unused-vars */
import { Client } from 'discord.js';
import { Events, RepeatMode } from 'distube';

// https://www.appsloveworld.com/discordjs/100/26/discord-js-music-bot-not-working-distube-framework
export default {
	name: Events.INIT_QUEUE,
	distube: true,
	async execute(client) {
		const queue = await client.distube.getQueue(client.id);
		console.log('Uma queue foi iniciada.');

	},
};