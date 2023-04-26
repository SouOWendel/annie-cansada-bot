/* eslint-disable brace-style */
import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js';
import 'dotenv/config';

import { loadEvents } from './Handlers/eventHandler.js';
import { loadCommands } from './Handlers/commandHandler.js';

// Create a new client instance
const { Guilds, GuildMembers, GuildMessages, GuildVoiceStates } = GatewayIntentBits;
// eslint-disable-next-line no-unused-vars
const { User, Message, GuildMember, ThreadMember, Channel } = Partials;

const client = new Client({
	intents: [Guilds, GuildMembers, GuildMessages, GuildVoiceStates],
	partials: [User, Message, GuildMember, ThreadMember],
 });

client.commands = new Collection();

loadEvents(client);

// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN).then(() => {
	loadCommands(client);
});