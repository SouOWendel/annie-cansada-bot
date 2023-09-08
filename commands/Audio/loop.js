import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { generalErrorEmbed } from '../../Data/embeds.js';

export const data = new SlashCommandBuilder()
	.setName('loop')
	.setDescription('Cê vai ficar ouvindo de novo, de novo, e de no-')
	.addStringOption(option =>
		option.setName('options')
			.setDescription('Opções de loop: off, song, queue')
			.addChoices(
				{ name: 'off', value: 'off' },
				{ name: 'song', value: 'song' },
				{ name: 'queue', value: 'queue' },
			)
			.setRequired(true),
	);

export async function execute(interaction) {
	// const client = await import('../../index.js');
	const { member, guild, options } = interaction;

	const option = options.getString('options');
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

		if (!queue) {
			embed.setColor('Red').setDescription('Não há queue ativa no momento.');
			return interaction.reply({ embeds: [embed], ephemeral: true });
		}

		let mode = null;

		switch (option) {
		case 'off':
			mode = 0;
			break;
		case 'song':
			mode = 1;
			break;
		case 'queue':
			mode = 2;
			break;
		}

		mode = await interaction.client.distube.setRepeatMode(voiceChannel, mode);
		mode = mode ? (mode === 2 ? 'Repeat queue' : 'Repeat song') : 'Off';
		embed.setColor('Orange').setDescription(`Set Repeat Mode para: \`${mode}\`.`);
		return interaction.reply({ embeds: [{
			'fields': [],
			'title': `🔁 Set repeat mode to \`${mode}\`.`,
			'color': 8667067,
		}], ephemeral: true });
	} catch (err) {
		console.log(err);
		generalErrorEmbed.description = 'Ocorreu um erro, verifique o seu comando...';
		return interaction.reply({ embeds: [generalErrorEmbed], ephemeral: true });
	}
}