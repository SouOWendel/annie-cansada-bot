/* eslint-disable brace-style */
// https://discordjs.guide/additional-features/reloading-commands.html#resulting-code
// Terminar o código!
import { SlashCommandBuilder } from 'discord.js';

// https://old.discordjs.dev/#/docs/builders/main/class/SlashCommandBuilder?scrollTo=options
export const data = new SlashCommandBuilder()
    .setName('reload')
    .setDescription('Reloads a command.')
    .addStringOption(option => option.setName('command')
        .setDescription('The command to reload.')
        .setRequired(true));
export async function execute(interaction) {
    const commandName = interaction.options.getString('command', true).toLowerCase();
    console.log(commandName);
		const command = interaction.client.commands.get(interaction.commandName);
        // console.log(command);
        // console.log(interaction.client.commands);
		if (!command) {
			return interaction.reply(`There is no command with name \`${commandName}\`!`);
		}
        console.log('Nome do Comando: ' + command.data.name);
        console.log('cache:' + require.cache[require.resolve(`./${command.data.name}.js`)]);
        delete require.cache[require.resolve(`./${command.data.name}.js`)];
		try {
            interaction.client.commands.delete(command.data.name);
            const newCommand = await import(`./${command.data.name}.js`);
            interaction.client.commands.set(newCommand.data.name, newCommand);
        await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);
        } catch (error) {
            console.error(error);
            await interaction.reply(`There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``);
		}
}