/* eslint-disable brace-style */
import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js';
import 'dotenv/config';

import { DisTube, StreamType } from 'distube';
import { SpotifyPlugin } from '@distube/spotify';
import { YtDlpPlugin } from '@distube/yt-dlp';

import { loadEvents } from './Handlers/eventHandler.js';
import { loadCommands } from './Handlers/commandHandler.js';
import { loadErrorHandler } from './Handlers/errorHandler.js';

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
	emitNewSongOnly: false,
	joinNewVoiceChannel: true,
	leaveOnEmpty: true,
	leaveOnStop: false,
	nsfw: true,
	emptyCooldown: 10,
	leaveOnFinish: false, /* Sair quando finalizar */
	emitAddSongWhenCreatingQueue: false,
	plugins: [
		new SpotifyPlugin(),
		new YtDlpPlugin({ update: true }),
	],
	streamType: StreamType.OPUS,
	youtubeCookie: 'YSC=uh40_73-tck; VISITOR_INFO1_LIVE=6ZyLl2gRT1M; PREF=tz=America.Sao_Paulo&f6=40000000&f7=100; HSID=AYhG7c4P2o4KBknH7; SSID=A3nKJFovfd-VMKxk8; APISID=dnbXsVuYaF9qtxym/Aof3uYU1gEQY8b1rJ; SAPISID=9VqygLpBQV-A-w7P/AJA1RwJab5aBRt39j; __Secure-1PAPISID=9VqygLpBQV-A-w7P/AJA1RwJab5aBRt39j; __Secure-3PAPISID=9VqygLpBQV-A-w7P/AJA1RwJab5aBRt39j; SID=YwjeVdXu014SveujgWepG3BGL2aT-nurYU1JLnTzPf2ffM9wyv8TS2H-AbVzrXbFgAeEuQ.; __Secure-1PSID=YwjeVdXu014SveujgWepG3BGL2aT-nurYU1JLnTzPf2ffM9wbL0HjAIQYxoInVRCVTo4cw.; __Secure-3PSID=YwjeVdXu014SveujgWepG3BGL2aT-nurYU1JLnTzPf2ffM9w59f0v2zdQ0xM-KrDgvCiUA.; LOGIN_INFO=AFmmF2swRgIhAPdx6kvNK7va5CWoWYODTHawqE6Kr0UbCo4fzqfbEg-uAiEAp2tW4pi0zsbF-K5-JGv8vKngn1j-TvKpQH9Dq5Rvvgg:QUQ3MjNmeS13d1FLTkM3cU44Z0x0UGtoaktlbF9kQXNic1M4dVg5dXM3QU5wMDJOeFNzcE1QQmlzWFU3WEpFYjJ2VVZobTc4UGFUelFGaWlTYWt6TzFiUjdjYzFqTmQ3NHhVNGZpRFVyb2VtNURhSmUtQ3dyd0pROVdJRHRzZmduRGlweDFJOGRJMl9CSFJmUDVXd284eGlISHhkbVAwMDhB; wide=1; __Secure-1PSIDTS=sidts-CjIBPu3jIRJ8lIo8vgKUdayZiM1Mm3tHj_foCm1c880WDNxWfGP9daNpTfsAdlDhwenwthAA; __Secure-3PSIDTS=sidts-CjIBPu3jIRJ8lIo8vgKUdayZiM1Mm3tHj_foCm1c880WDNxWfGP9daNpTfsAdlDhwenwthAA; SIDCC=APoG2W-TN3BrQxrxi64B8ncM0TqhiFnsL3-2QA83yx0oTFngskdpqkLwxOj-fdW-U4Q9gA0vTVQ; __Secure-1PSIDCC=APoG2W-lvzwNRGXv-D729S7pObMPdaK_KItBH3syrJZW25SyVLTCfyDKhZgyQpNtiH-WcAenGCwd; __Secure-3PSIDCC=APoG2W9YTgLmMWWzaRVfvSPfVZyLQC99xe30FLgBto607El27Db8wPUyCgIuYppQ8-wh2KwkjM-x',
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