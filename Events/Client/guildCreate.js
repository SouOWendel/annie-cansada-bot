// eslint-disable-next-line no-unused-vars
import { Client } from 'discord.js';
import { RepeatMode } from 'distube';

export default {
	name: 'guildCreate',
	// eslint-disable-next-line no-unused-vars
	async execute(guild, client) {
		// Bot entra com repeat mode desativado.
		RepeatMode.DISABLED;

		const vol = 20;
		guild.client.distube.setVolume(guild.id, vol);

		console.log(`Volume setado para ${vol}.`);
	},
};