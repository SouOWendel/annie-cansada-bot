import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { generalErrorEmbed } from '../../data/embeds.js';

export const data = new SlashCommandBuilder()
	.setName('skip')
	.setDescription(
		'Assim que eu utilizar VENTUS PULUS essa música irá embora.',
	)
	.addIntegerOption((option) =>
		option
			.setName('para')
			.setDescription(
				'Escolha para que posição da queue você deseja pular. Se necessário utilize /queue',
			)
			.setMinValue(1)
			.setRequired(false),
	);

export async function execute(interaction) {
	// const client = await import('../../index.js');
	const { member, guild, options } = interaction;

	const voiceChannel = member.voice.channel;
	const option = options.getInteger('para');

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

		if (option) {
			if (isNaN(option))
				return interaction.reply(
					'| Por favor, coloque um número valido!',
				);
			await queue.jump(option - 1);
			return interaction.reply({
				embeds: [
					{
						color: 16777215,
						author: {
							name: `A música foi pulada para posição ${option}.`,
							icon_url:
								'https://media.discordapp.net/attachments/1100223066673520663/1103760762469634088/minecraft_1.gif',
						},
					},
				],
				ephemeral: false,
			});
		}

		await queue.skip(voiceChannel);
		return interaction.reply({
			embeds: [
				{
					color: 16777215,
					author: {
						name: 'A música foi pulada.',
						icon_url:
							'https://media.tenor.com/zx_m_fhcxW0AAAAi/noot-noot-pingu.gif',
					},
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
