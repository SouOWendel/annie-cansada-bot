// eslint-disable-next-line no-unused-vars
import { ActivityType, Client } from 'discord.js';
import { usagePercent } from 'cpu-stat';
import { ExtractorPlugin } from 'distube';

export default {
    name: 'ready',
    once: true,
    execute(client) {

        if (client.user.username == 'Beatrice') client.user.setActivity('Re:Zero Waifu', { type: ActivityType.Playing });
        else if (client.user.username == 'Annie Cansada') client.user.setActivity('Devilline HQ — Character', { type: ActivityType.Playing });

        setTimeout(async () => {
            console.log(`\n${client.user.username} agora está online.`);
            console.log('Status: Devilline HQ — Character.');
            // console.table({
            //     'Time Stamp': new Date().getTime(),
            //     'OS': 'aaaa',
            //     'Browser': 'aaaa',
            //     'Language': 'aaaa',
            //   });
        }, 200);

    },
};