// eslint-disable-next-line no-unused-vars
import { ActivityType, Client } from 'discord.js';

export default {
    name: 'ready',
    once: true,
    execute(client) {
        client.user.setActivity('Devilline HQ — Character', { type: ActivityType.Playing });
        setTimeout(() => {
            console.log(`\n${client.user.username} agora está online.`);
            console.log('Status: Devilline HQ — Character.');
        }, 100);
    },
};