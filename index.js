import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js';
import 'dotenv/config';

import { Kazagumo } from 'kazagumo';
import { Connectors } from 'shoukaku';

import { loadEvents } from './Handlers/eventHandler.js';
import { loadCommands } from './Handlers/commandHandler.js';
import { loadErrorHandler } from './Handlers/errorHandler.js';

// Cria o cliente Discord com os intents necessários
const { Guilds, GuildMembers, GuildMessages, GuildVoiceStates } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
	intents: [Guilds, GuildMembers, GuildMessages, GuildVoiceStates],
	partials: [User, Message, GuildMember, ThreadMember],
});

// Coleção para armazenar comandos em memória
client.commands = new Collection();
client.voiceManager = new Collection();

// Configuração do nó do Lavalink
const Nodes = [{
	name: 'Main Node',
	url: `${process.env.LAVALINK_HOST || 'localhost'}:${process.env.LAVALINK_PORT || '2333'}`,
	auth: process.env.LAVALINK_PASSWORD || 'youshallnotpass',
	secure: process.env.LAVALINK_SECURE === 'true',
}];

// Instancia o gerenciador de áudio Kazagumo
client.manager = new Kazagumo({
	defaultSearchEngine: 'youtube',
	send: (guildId, payload) => {
		const guild = client.guilds.cache.get(guildId);
		if (guild) guild.shard.send(payload);
	},
}, new Connectors.DiscordJS(client), Nodes);

// Eventos de status do Lavalink
client.manager.shoukaku.on('ready', (name) => console.log(`🎵 Lavalink Node "${name}" conectado com sucesso!`));
client.manager.shoukaku.on('error', (name, error) => console.error(`❌ Erro no Lavalink Node "${name}":`, error));

// Carrega os eventos do Discord
loadEvents(client);

// Faz login do bot e carrega comandos e tratador de erros
client.login(process.env.DISCORD_TOKEN).then(() => {
	loadCommands(client);
	loadErrorHandler(client);
});

export default client;