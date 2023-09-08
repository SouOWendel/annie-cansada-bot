/* eslint-disable no-unused-vars */
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { generalErrorEmbed } from '../../Data/embeds.js';
import { DisTubeError } from 'distube';

export const data = new SlashCommandBuilder()
	.setName('resume')
	.setDescription('Annie retoma o que estava escutando. — Agora sim!');

export async function execute(interaction) {
	// const client = await import('../../index.js');
	const { member, guild, channel } = interaction;

	const voiceChannel = member.voice.channel;

	const embed = new EmbedBuilder();

	if (!voiceChannel) {
		embed.setColor('Red').setDescription('Você precisa estar em um canal de voz para executar os comandos de música!');
		return interaction.reply({ embeds: [embed], ephemeral: true });
	}

	if (!member.voice.channelId == guild.members.me.voice.channelId) {
		embed.setColor('Red').setDescription(`Você não pode utilizar o player de música porque já esta ativo em ${guild.members.me.voice.channelId}`);
		return interaction.reply({ embeds: [embed], ephemeral: true });
	}

	try {
		const queue = await interaction.client.distube.getQueue(voiceChannel);
		// const messages = await channel.messages.fetch({ limit: 7 });

		if (!queue) {
			embed.setColor('Red').setTitle('⛔ |  Não há queue ativa no momento.');
			return interaction.reply({ embeds: [embed], ephemeral: true });
		}
		await queue.resume(voiceChannel);

		// const messagefilter = messages.first(7);
		// console.log(messagefilter);

		// for (let i = 0; i < messagefilter.length; i++) {
		//     if (messagefilter[i].interaction.commandName == 'pause') {
		//         messagefilter[i].delete();
		//         return interaction.reply({ embeds: [{
		//             'fields': [],
		//             'title': '⏯ Solta o som DJ!',
		//             'color': 8075983,
		//         }], ephemeral: false });
		//     } else {
		return interaction.reply({ embeds: [{
			'fields': [],
			'title': '⏯ Solta o som DJ.',
			'description': '— Yeah boo be bo bee bo yeh',
			'color': 8075983,
			'thumbnail': {
				'url': 'https://cdn.discordapp.com/attachments/1100223066673520663/1103393269494321232/friday-night-funkin-week6_1.gif',
			},
		}], ephemeral: false });
		// }
		// }

	} catch (err) {
		console.log('Ocorreu o erro: ' + err.errorCode);
		if (err.name == 'DisTubeError [RESUMED]') {
			console.log(err);
			generalErrorEmbed.description = 'A música já esta tocando...';
			return interaction.reply({ embeds: [generalErrorEmbed], ephemeral: true });
		} else {
			console.log(err);
			generalErrorEmbed.description = 'Ocorreu um erro, verifique o seu comando...';
			return interaction.reply({ embeds: [generalErrorEmbed], ephemeral: true });
		}
	}
}