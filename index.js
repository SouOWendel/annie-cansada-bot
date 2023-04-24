/* eslint-disable brace-style */
// Require the necessary discord.js classes
import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const foldersPath = join(__dirname, 'commands');
const pastas = readdirSync(foldersPath).filter(file => statSync(path.join(foldersPath, file)).isDirectory());

	for (const p of pastas) {
		// Grab all the command files from the commands directory you created earlier
		const commandsPath = join(foldersPath, p);
		const commandFiles = readdirSync(commandsPath);
		// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
		for (const file of commandFiles) {
			const comando = await import('./commands/' + p + '/' + file);
			console.log('./commands/' + p + '/' + file);
			if (comando.data && comando.execute) {
				client.commands.set(comando.data.name, comando);
				console.log('Comando atribuido com exito.')
			} else {
				console.log(`[WARNING] The command at ${file} is missing a required "data" or "execute" property.`);
			}
		}
	}

// console.log(client.commands);

// ----------------------------------------------------
// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Pronto! Logando como ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);
	// console.log(command);
	// console.log(interaction.commandName);
	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);