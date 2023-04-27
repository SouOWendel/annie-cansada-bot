/* eslint-disable brace-style */
import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js';
import 'dotenv/config';

import { DisTube } from 'distube';
import { SpotifyPlugin } from '@distube/spotify';

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

// Sistema de Música YOUTUBE/SPOTIFY
client.distube = new DisTube(client, {
	emitNewSongOnly: true,
	leaveOnEmpty: true,
	leaveOnStop: true,
	emptyCooldown: 60,
	leaveOnFinish: false, /* Sair quando finalizar */
	emitAddSongWhenCreatingQueue: false,
	plugins: [new SpotifyPlugin()],
});

// Coleção de comandos
client.commands = new Collection();

export default client;

loadEvents(client);

// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN).then(() => {
	loadCommands(client);
});