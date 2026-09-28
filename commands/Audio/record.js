import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('record')
	.setDescription('Comando desativado temporariamente.');

export async function execute(interaction) {
	await interaction.reply({
		content: '⚠️ O recurso de gravação de voz está desativado.',
		ephemeral: true,
	});
}
