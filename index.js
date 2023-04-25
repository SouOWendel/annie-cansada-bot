/* eslint-disable brace-style */
import { Client, Collection, Events, GatewayIntentBits, Partials } from 'discord.js';
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

// ----------------------------------------------------
// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, async c => {
	console.log(`Pronto! Logando como ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.client.member) {
		console.log('User is in voice channel!');
	}

	const command = client.commands.get(interaction.commandName);
	// console.log(command);
	// console.log(interaction.commandName);
	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'Houve um erro durante a execução do comando!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'Houve um erro durante a execução do comando!', ephemeral: true });
		}
	}
});

// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN).then(() => {
	loadEvents(client);
	loadCommands(client);
});