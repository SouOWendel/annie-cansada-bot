import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('A Annie te responderá um Pong!!')
	.setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function execute(interaction) {
	interaction.reply({ content: 'Pong!', ephemeral: true });
}