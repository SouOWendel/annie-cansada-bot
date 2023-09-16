import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { generalErrorEmbed } from '../../data/embeds.js';

export const data = new SlashCommandBuilder()
	.setName('volume')
	.setDescription('Ei, tá muito alto... ou baixo, deixa eu ajeitar pra você.')
	.addIntegerOption((option) =>
		option
			.setName('percento')
			.setDescription('10 = 10%')
			.setMinValue(1)
			.setMaxValue(100)
			.setRequired(true),
	);

export async function execute(interaction) {
	// const client = await import('../../index.js');
	const { member, guild, options } = interaction;

	const volume = options.getInteger('percento');
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
		interaction.client.distube.setVolume(voiceChannel, volume);
		return interaction.reply({
			embeds: [
				{
					fields: [],
					color: 11418941,
					title: `🔉 Volume foi setado para **${volume}**.`,
				},
			],
			ephemeral: true,
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
