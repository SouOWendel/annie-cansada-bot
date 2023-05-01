/* eslint-disable brace-style */
import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js';
import 'dotenv/config';

import { DisTube, StreamType } from 'distube';
import { SpotifyPlugin } from '@distube/spotify';
import { YtDlpPlugin } from '@distube/yt-dlp';

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
	emitNewSongOnly: false,
	joinNewVoiceChannel: true,
	leaveOnEmpty: true,
	leaveOnStop: true,
	nsfw: false,
	emptyCooldown: 10,
	leaveOnFinish: false, /* Sair quando finalizar */
	emitAddSongWhenCreatingQueue: false,
	plugins: [
		new SpotifyPlugin(),
		new YtDlpPlugin({ update: true }),
	],
	streamType: StreamType.OPUS,
	youtubeCookie: 'DEVICE_INFO=ChxOekU1TXpReU9EWXhPRGcwTmpVMk1qVXdNZz09ELfi0J4GGLfi0J4G; VISITOR_INFO1_LIVE=6bLeb7pBUG4; YSC=1zoSDo7XW88; PREF=f6=40000000&tz=America.Sao_Paulo&f7=150; HSID=Aul4dZA4xKn8DnEsT; SSID=A7AOek-oDr3YjHRAJ; APISID=kjCgcGMRjVDbVudk/A6D4USHQHsoO4UAJx; SAPISID=TA9nKw4_K1EqAc9-/AivJ-A3v3EIXXnqAL; __Secure-1PAPISID=TA9nKw4_K1EqAc9-/AivJ-A3v3EIXXnqAL; __Secure-3PAPISID=TA9nKw4_K1EqAc9-/AivJ-A3v3EIXXnqAL; SID=VwjeVSCSxO-Pz58nFkKXeAPWuSmX0RM1d225sJWDRrenH4cYHQBCEnFXDz4HkYFi84Di1g.; __Secure-1PSID=VwjeVSCSxO-Pz58nFkKXeAPWuSmX0RM1d225sJWDRrenH4cYXWoBmoLIhjwFQp0pIsYhUg.; __Secure-3PSID=VwjeVSCSxO-Pz58nFkKXeAPWuSmX0RM1d225sJWDRrenH4cYBn-4w6OM8MkLkkLD_i2JtA.; wide=1; LOGIN_INFO=AFmmF2swRQIgBPGFxAPDedjfS1LQmcZO9a2-Ptmwlj7HdekmLDycPokCIQDLPxPSXHfL0hzsvzLBmjIpQFZEmBNCKOaScgMFgbYr3A:QUQ3MjNmejk2ZDUxOUxWcjNIUWV1RGQ1S0lKdHl1OWdDLXRQdGtxQVNONEkyLUFHV0dJR0xacWRWRWpWdjFOY200OTdtWkJmaGpSdGt6QWhBcXgzRDE0aEpfbVlXYnVUUHhjV2FEanR6V2ZNaG1uQXZwU3g1WDQ5NExDTE0wajdvRTQ3WW13ZHVFc0N3SV9RTU5JbFNSNU1UdjRYT0FXQWxn; SIDCC=AP8dLtyQ_IIU4sxhjHC-RKAeVKNAkV4X-aaiB5PaYddWmJL67FH16rvKX1AEx_uybVoFlAhRc3rh; __Secure-1PSIDCC=AP8dLtyB7mlk9oAytlHNCfRI-SH-hNfhK0tyVm-j14LaQwNkU9kN3mAFgQE-5-TgItvbCVFQ62E; __Secure-3PSIDCC=AP8dLtxnJqQZAXyuUJeBFgwSuufL-rQ9jyApgYYFyxIWOeh4dtdtsqsyAZSZUoeENm5U43mqFl_-',
});

// Coleção de comandos
client.commands = new Collection();

export default client;

loadEvents(client);

client.distube.on('error', (channel, e) => {
	if (channel) channel.send(`An error encountered: ${e}`);
	else console.error(e);
});

// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN).then(() => {
	loadCommands(client);
});