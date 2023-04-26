// eslint-disable-next-line no-unused-vars
import { Client } from 'discord.js';

export default {
    name: 'messageCreate',
    async execute(message, client) {
        // Variavel que armazena as marcações
        const botid = message.mentions.users.map(msg => msg.id);

        if (botid == client.user.id) {
            try {
                console.log(`Eiii!! O usuário ${message.author.username} me chamou no chat!`);
                await message.reply('Quié 😤');
            } catch (err) {
                // There are various reasons why sending a message may fail.
                // The API might time out or choke and return a 5xx status,
                // or the bot may not have permission to send the
                // message (403 status).
                console.warn('Falhei em responder a mensagem.');
                console.warn(err);
            }
        }
    },
};