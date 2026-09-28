import { ActivityType } from 'discord.js';

export default {
	name: 'ready',
	once: true,
	async execute(interaction, client) {
		const description = {
			annie: 'Devilline HQ — Character',
			beatrice: 'Re:Zero Waifu',
		};

		if (client.user.username === 'Beatrice') {
			client.user.setActivity(description.beatrice, { type: ActivityType.Playing });
		} else {
			client.user.setActivity(description.annie, { type: ActivityType.Playing });
		}

		console.log(`\n🤖 ${client.user.username} agora está online.`);
		console.log(`Status: ${(client.user.username === 'Beatrice') ? description.beatrice : description.annie}.`);
	},
};