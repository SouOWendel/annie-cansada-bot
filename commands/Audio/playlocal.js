import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('playlocal')
	.setDescription('Toca um arquivo de áudio enviado como anexo.')
	.addAttachmentOption((option) =>
		option
			.setName('arquivo')
			.setDescription('Arquivo de áudio (MP3, WAV, etc.)')
			.setRequired(true),
	);

export async function execute(interaction, client) {
	await interaction.deferReply();

	const { member, guild, channel } = interaction;
	const voiceChannel = member.voice.channel;
	const attachment = interaction.options.getAttachment('arquivo');

	if (!voiceChannel) {
		const embed = new EmbedBuilder()
			.setColor('Red')
			.setDescription('Você precisa estar em um canal de voz para tocar áudio!');
		return interaction.editReply({ embeds: [embed] });
	}

	try {
		const player = await client.manager.createPlayer({
			guildId: guild.id,
			textId: channel.id,
			voiceId: voiceChannel.id,
			deaf: true,
		});

		const res = await client.manager.search(attachment.url, { requester: interaction.user });

		if (!res || !res.tracks.length) {
			return interaction.editReply({ content: '❌ Não foi possível carregar o arquivo de áudio enviado.' });
		}

		const track = res.tracks[0];
		player.queue.add(track);
		if (!player.playing && !player.paused) player.play();

		const embed = new EmbedBuilder()
			.setColor(3501486)
			.setDescription(`🎵 **Arquivo adicionado à fila:** \`${attachment.name}\``);

		return interaction.editReply({ embeds: [embed] });
	} catch (err) {
		console.error(err);
		return interaction.editReply({ content: '❌ Ocorreu um erro ao carregar o anexo.' });
	}
}
