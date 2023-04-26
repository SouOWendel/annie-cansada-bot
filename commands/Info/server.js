import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('server')
	.setDescription('Annie consultará alguns dados do servidor especialmente para você.');
export async function execute(interaction) {
	// interaction.guild is the object representing the Guild in which the command was run
	await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
}