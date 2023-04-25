// eslint-disable-next-line no-unused-vars
import { Client } from 'discord.js';

export default {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`${client.user.username} agora está online.`);
    },
};