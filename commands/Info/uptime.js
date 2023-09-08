// eslint-disable-next-line no-unused-vars
import { SlashCommandBuilder, EmbedBuilder, Client } from 'discord.js';

// https://old.discordjs.dev/#/docs/builders/main/class/SlashCommandBuilder?scrollTo=options
export const data = new SlashCommandBuilder()
	.setName('uptime')
	.setDescription('Cê descobre a quanto tempo eu tô sem dormir...');

export async function execute(interaction) {
	const days = Math.floor(interaction.client.uptime / 86400000);
	const hours = Math.floor(interaction.client.uptime / 3600000) % 24;
	const minutes = Math.floor(interaction.client.uptime / 60000) % 60;
	const seconds = Math.floor(interaction.client.uptime / 1000) % 60;

	const embed = new EmbedBuilder()
		.setTitle(`__${interaction.client.user.username}'s Uptime__`)
		.setColor('Blue')
		.setTimestamp()
		.addFields(
			{ name: 'Uptime', value: ` \`${days}\` days, \`${hours}\` hours, \`${minutes}\` minutes and \`${seconds}\` seconds.` },
		);

	interaction.reply({ embeds: [embed] });
}