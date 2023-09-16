/* eslint-disable no-unused-vars */
import { SlashCommandBuilder, EmbedBuilder, Client } from 'discord.js';
import { usagePercent } from 'cpu-stat';

// https://old.discordjs.dev/#/docs/builders/main/class/SlashCommandBuilder?scrollTo=options
export const data = new SlashCommandBuilder()
	.setName('botinfo')
	.setDescription('Consegue informações sobre o bot!');

export async function execute(interaction) {
	const { channel, member } = interaction;

	const days = Math.floor(interaction.client.uptime / 86400000);
	const hours = Math.floor(interaction.client.uptime / 3600000) % 24;
	const minutes = Math.floor(interaction.client.uptime / 60000) % 60;
	const seconds = Math.floor(interaction.client.uptime / 1000) % 60;

	usagePercent(function (error, percent) {
		if (error) return interaction.reply({ content: `${error}` });

		const memoryUsage = formatBytes(process.memoryUsage().heapUsed);
		const node = process.version;
		const cpu = percent.toFixed(2);

		const embed = new EmbedBuilder()
			.setTitle('Informações do Bot')
			.setColor('Blue')
			.addFields(
				{
					name: 'Desenvolvedor',
					value: 'Sou o Wendel#1676',
					inline: true,
				},
				{
					name: 'Nome de Usuário',
					value: 'Sou o Wendel#1676',
					inline: true,
				},
				{ name: 'ID', value: 'Sou o Wendel#1676', inline: true },
				{ name: 'data de Criação', value: '23/04/2023' },
				{ name: 'Comando de ajuda', value: '/help' },
				{
					name: 'Tempo Online',
					value: ` \`${days}\` days, \`${hours}\` hours, \`${minutes}\` minutes and \`${seconds}\` seconds.`,
				},
				{
					name: 'Ping (bot)',
					value: `${interaction.client.ws.ping}ms`,
				},
				{ name: 'Node Versão', value: `${node}` },
				{ name: 'Uso da CPU', value: `${cpu}%` },
				{ name: 'Uso de Memória', value: `${memoryUsage}` },
			);

		interaction.reply({ embeds: [embed] });
	});

	function formatBytes(a, b) {
		const c = 1024;
		const d = b || 2;
		const e = ['B', 'KB', 'MB', 'GB', 'TB'];
		const f = Math.floor(Math.log(a) / Math.log(c));

		return parseFloat((a / Math.pow(c, f)).toFixed(d)) + '' + e[f];
	}
}
