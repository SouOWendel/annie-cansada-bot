/* eslint-disable brace-style */
import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js';
import 'dotenv/config';

import { DisTube, StreamType } from 'distube';
import { SpotifyPlugin } from '@distube/spotify';
import { YtDlpPlugin } from '@distube/yt-dlp';

import { loadEvents } from './Handlers/eventHandler.js';
import { loadCommands } from './Handlers/commandHandler.js';
import { loadErrorHandler } from './Handlers/errorHandler.js';

const fs = await import('fs');

// Create a new client instance
const { Guilds, GuildMembers, GuildMessages, GuildVoiceStates } =
	GatewayIntentBits;
// eslint-disable-next-line no-unused-vars
const { User, Message, GuildMember, ThreadMember, Channel } = Partials;

const client = new Client({
	intents: [Guilds, GuildMembers, GuildMessages, GuildVoiceStates],
	partials: [User, Message, GuildMember, ThreadMember],
});

// Sistema de Música YOUTUBE/SPOTIFY
client.distube = new DisTube(client, {
	emitNewSongOnly: false,
	joinNewVoiceChannel: true,
	leaveOnEmpty: true,
	leaveOnStop: false,
	nsfw: true,
	emptyCooldown: 10,
	leaveOnFinish: false /* Sair quando finalizar */,
	emitAddSongWhenCreatingQueue: false,
	plugins: [new SpotifyPlugin(), new YtDlpPlugin({ update: true })],
	streamType: StreamType.OPUS,
	youtubeCookie: JSON.parse(fs.readFileSync('cookies.json')),
});

// Coleção de comandos
client.commands = new Collection();

/* Collection to store voice state */
client.voiceManager = new Collection();

export default client;

loadEvents(client);

client.distube.on('error', (channel, e) => {
	if (channel) channel.send(`An error encountered: ${e}`);
	else console.error(e);
});

// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN).then(() => {
	loadCommands(client);
	loadErrorHandler(client);
});
