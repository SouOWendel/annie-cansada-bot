import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { generalErrorEmbed } from '../../data/embeds.js';

export const data = new SlashCommandBuilder()
	.setName('stop')
	.setDescription('Annie fica de saco cheio e acaba com a festa (playlist).');

export async function execute(interaction) {
	// const client = await import('../../index.js');
	const { member, guild } = interaction;

	const voiceChannel = member.voice.channel;

	const embed = new EmbedBuilder();

	if (!voiceChannel) {
		embed
			.setColor('Red')
			.setDescription(
				'Você precisa estar em um canal de voz para executar os comandos de música!',
			);
		return interaction.reply({ embeds: [embed], ephemeral: true });
	}

	if (!member.voice.channelId == guild.members.me.voice.channelId) {
		embed
			.setColor('Red')
			.setDescription(
				`Você não pode utilizar o player de música porque já esta ativo em ${guild.members.me.voice.channelId}`,
			);
		return interaction.reply({ embeds: [embed], ephemeral: true });
	}

	try {
		const queue = await interaction.client.distube.getQueue(voiceChannel);

		if (!queue) {
			embed
				.setColor('Red')
				.setDescription('Não há queue ativa no momento.');
			return interaction.reply({ embeds: [embed], ephemeral: true });
		}

		await queue.stop(voiceChannel);
		return interaction.reply({
			embeds: [
				{
					fields: [],
					color: 11418941,
					title: '⏹ Quem parou a música?',
				},
			],
			ephemeral: false,
		});
	} catch (err) {
		console.log(err);
		generalErrorEmbed.description =
			'Ocorreu um erro, verifique o seu comando...';
		return interaction.reply({
			embeds: [generalErrorEmbed],
			ephemeral: true,
		});
	}
}
