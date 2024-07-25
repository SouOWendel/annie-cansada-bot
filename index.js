/* eslint-disable brace-style */
import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js';
import 'dotenv/config';

import { DisTube, isVoiceChannelEmpty } from 'distube';
import { SpotifyPlugin } from '@distube/spotify';
import { YouTubePlugin } from '@distube/youtube';
import { YtDlpPlugin } from '@distube/yt-dlp';

import { loadEvents } from './handlers/eventHandler.js';
import { loadCommands } from './handlers/commandHandler.js';
import { loadErrorHandler } from './handlers/errorHandler.js';

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
	// leaveOnEmpty: true,
	// leaveOnStop: false,
	nsfw: true,
	// emptyCooldown: 10,
	// leaveOnFinish: false /* Sair quando finalizar */,
	emitAddSongWhenCreatingQueue: false,
	// ffmpeg: {
	// 	path: 'ffmpeg/bin',
	// },
	plugins: [
		new SpotifyPlugin(),
		new YouTubePlugin({cookies: JSON.parse(fs.readFileSync('cookies.json'))}),
		new YtDlpPlugin({ update: true })
	],
});

// Coleção de comandos
client.commands = new Collection();

/* Collection to store voice state */
client.voiceManager = new Collection();

export default client;

loadEvents(client);

client.on('error', (e, queue, song) => {
	queue.textChannel.send(`Um erro foi encontrado: ${e}`);
});

// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN).then(() => {
	loadCommands(client);
	loadErrorHandler(client);

	setInterval(function () {
		console.log(client.ws.ping + 'ms');
	}, 5000);
});
