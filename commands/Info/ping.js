import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('A Annie te responderá um Pong!!')
	.setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function execute(interaction) {

	const embed = new EmbedBuilder()
		.setDescription(`Pong! ${interaction.client.ws.ping}ms`);

	interaction.reply({ embeds: [embed], ephemeral: false });
}