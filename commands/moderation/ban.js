import { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } from 'discord.js';

// https://old.discordjs.dev/#/docs/builders/main/class/SlashCommandBuilder?scrollTo=options
export const data = new SlashCommandBuilder()
	.setName('ban')
	.setDescription('ban!')
	.addMentionableOption(option => option.setName('usuario')
        .setDescription('A pessoa que será banida.')
        .setRequired(true))
	.addStringOption(option => option.setName('razao')
		.setDescription('Qual é a razão para o banimento?')
		.setRequired(false));

export async function execute(interaction) {
	const target = interaction.options.getUser('usuario');
	const reason = interaction.options.getString('razao') ?? 'No reason provided';

	const confirm = new ButtonBuilder()
		.setCustomId('confirm')
		.setLabel('Confirmar Ban')
		.setStyle(ButtonStyle.Danger);

	const cancel = new ButtonBuilder()
		.setCustomId('cancel')
		.setLabel('Cancelar')
		.setStyle(ButtonStyle.Secondary);

	const row = new ActionRowBuilder()
		.addComponents(cancel, confirm);

	await interaction.reply({
		content: `Você quer banir ${target} pela razão: ${reason}?`,
		components: [row],
	});
}