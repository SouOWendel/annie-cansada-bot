import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { getRandomFact } from '../../utils/random.js';
import { capitalize } from '../../utils/string.js';
import { generalErrorEmbed } from '../../data/embeds.js';

export const data = new SlashCommandBuilder()
	.setName('playlocal')
	.setDescription(
		'O que você quer escutar? Argh, me conta, vai, se não vou ir dormir.',
	)
	.addAttachmentOption((option) =>
		option
			.setName('localfile')
			.setDescription('Nome ou URL do som.')
			.setRequired(true),
	)
	.addStringOption((option) =>
		option
			.setName('options')
			.setDescription(
				'Opções de reprodução: "agora" pula a atual e toca, "próxima" próximo som na queue.',
			)
			.addChoices(
				{ name: 'agora', value: 'agora' },
				{ name: 'próxima', value: 'proxima' },
			)
			.setRequired(false),
	);

export async function execute(interaction) {
	const { options, member, guild, channel } = interaction;

	const voiceChannel = member.voice.channel;
	const option = options.getString('options');

	const attachment = options.getAttachment('localfile');

	const name = attachment.name;
	const url = attachment.url;
	const proxyURL = attachment.proxyURL;

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
		console.log(`Nome: ${name} \n URL: ${url} \n ProxyURL: ${proxyURL}`);

		const OK_URL = proxyURL.replace('https', 'http');
		console.log(OK_URL);

		if (option) {
			switch (option) {
				case 'agora':
					await interaction.client.distube.play(
						voiceChannel,
						OK_URL,
						{ textChannel: channel, member: member, skip: true },
					);
					break;
				case 'proxima':
					await interaction.client.distube.play(
						voiceChannel,
						OK_URL,
						{ textChannel: channel, member: member, position: 1 },
					);
					break;
			}
		}

		await interaction.deferReply();
		await interaction.client.distube.play(voiceChannel, OK_URL, {
			textChannel: channel,
			member: member,
		});

		const queue = await interaction.client.distube.getQueue(voiceChannel);
		const song = queue.songs[queue.songs.length - 1];

		// 60% de chance de aparecer retornar um array contendo um fato.
		const fact = getRandomFact(20);
		const embedjson = {
			content: '',
			embeds: [
				{
					fields: [],
					author: {
						name: `${song.member.user.username} — ${
							member.roles.highest.name
								? member.roles.highest.name
								: 'Usuário do Servidor'
						}`,
						icon_url: song.member.displayAvatarURL(),
					},
					footer: {
						text: `${
							fact ? fact[0] + '\n' + capitalize(fact[1]) : ''
						}`,
					},
					description: `🎶 **[${song.name}](${song.url})** — \`${song.formattedDuration}\``,
					thumbnail: {
						url: song.thumbnail,
					},
					color: 3501486,
				},
			],
		};

		return await interaction.editReply(embedjson);
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
