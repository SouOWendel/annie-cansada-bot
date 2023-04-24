/* eslint-disable brace-style */
import { REST, Routes } from 'discord.js';
import 'dotenv/config';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commands = [];
// Grab all the command files from the commands directory you created earlier
const foldersPath = join(__dirname, 'commands');
const pastas = readdirSync(foldersPath).filter(file => statSync(path.join(foldersPath, file)).isDirectory());

for (const p of pastas) {
	// Grab all the command files from the commands directory you created earlier
	const commandsPath = join(foldersPath, p);
	const commandFiles = readdirSync(commandsPath);
	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for (const file of commandFiles) {
		// console.log(commandFiles);
		const { data, execute } = await import('./commands/' + p + '/' + file);
			if (data && execute) {
				commands.push(data.toJSON());
			} else {
				console.log(`[WARNING] The command at ${file} is missing a required "data" or "execute" property.`);
			}
	}
}

const arquivosjs = readdirSync(foldersPath);
arquivosjs.forEach(async file => {
	if (path.extname(file) == '.js') {

		const filesPath = foldersPath + '\\' + file;
		console.log('Diretório Atual: ' + filesPath);
		const { data, execute } = await import('./commands/' + file);

			if (data && execute) {
				commands.push(data.toJSON());
			} else {
				console.log(`[WARNING] The command at ${file} is missing a required "data" or "execute" property.`);
			}
	}
});

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.DISCORD_TOKEN);

// console.log(process.env.DISCORD_TOKEN);
// console.log(process.env.APP_ID);
// console.log(process.env.ALO_GUILD_ID);

// and deploy your commands!
setTimeout(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationCommands(process.env.APP_ID),
			{ body: commands },
		);
	
		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
});