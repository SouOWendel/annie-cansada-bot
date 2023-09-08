import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { generalErrorEmbed } from '../../Data/embeds.js';

export const data = new SlashCommandBuilder()
	.setName('timeline')
	.setDescription('Avance o som ou retroceda-o! — Aqui, essa parte que eu gosto, olha!')
	.addSubcommand(subcommand =>
		subcommand.setName('avancar')
			.setDescription('Avance o som o quanto quiser.')
			.addIntegerOption(option =>
				option.setName('seconds_avancar')
					.setDescription('Avance o som em tantos segundos.')
					.setMinValue(1)
					.setMaxValue(100)
					.setRequired(true)))
	.addSubcommand(subcommand =>
		subcommand.setName('retro')
			.setDescription('Retroceda o som o quanto quiser.')
			.addIntegerOption(option =>
				option.setName('seconds_retro')
					.setDescription('Retroceda o som em tantos segundos.')
					.setMinValue(1)
					.setMaxValue(100)
					.setRequired(true)));

export async function execute(interaction) {
	// const client = await import('../../index.js');
	const { member, guild, options } = interaction;

	const subcommand = options.getSubcommand();
	const secondsA = options.getInteger('seconds_avancar');
	const secondsR = options.getInteger('seconds_retro');
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
		console.log('tempo atual: ' + queue.currentTime);
		switch (subcommand) {
		case 'avancar':
			await queue.seek(queue.currentTime + secondsA);
			embed.setColor('Blue').setDescription(`Avancei o som por ${secondsA} segundos.`);
			return interaction.reply({ embeds: [embed], ephemeral: true });
		case 'retro':
			await queue.seek(queue.currentTime - secondsR);
			embed.setColor('Blue').setDescription(`Retrocedi o som por ${secondsA} segundos.`);
			return interaction.reply({ embeds: [embed], ephemeral: true });
		}
	} catch (err) {
		console.log(err);
		generalErrorEmbed.description = 'Ocorreu um erro, verifique o seu comando...';
		return interaction.reply({ embeds: [generalErrorEmbed], ephemeral: true });
	}
}