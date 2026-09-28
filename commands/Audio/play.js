import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { getRandomFact } from '../../Utils/random.js';
import { capitalize } from '../../Utils/string.js';

export const data = new SlashCommandBuilder()
	.setName('play')
	.setDescription('O que você quer escutar? Argh, me conta, vai, se não vou ir dormir.')
	.addStringOption((option) =>
		option
			.setName('query')
			.setDescription('Nome ou URL da música.')
			.setRequired(true),
	);

export async function execute(interaction, client) {
	await interaction.deferReply();

	const { member, guild, channel } = interaction;
	const voiceChannel = member.voice.channel;
	const query = interaction.options.getString('query');

	if (!voiceChannel) {
		const embed = new EmbedBuilder()
			.setColor('Red')
			.setDescription('Você precisa estar em um canal de voz para executar comandos de música!');
		return interaction.editReply({ embeds: [embed] });
	}

	if (guild.members.me.voice.channelId && voiceChannel.id !== guild.members.me.voice.channelId) {
		const embed = new EmbedBuilder()
			.setColor('Red')
			.setDescription(`Você precisa estar no mesmo canal de voz que eu (<#${guild.members.me.voice.channelId}>)!`);
		return interaction.editReply({ embeds: [embed] });
	}

	try {
		const player = await client.manager.createPlayer({
			guildId: guild.id,
			textId: channel.id,
			voiceId: voiceChannel.id,
			deaf: true,
		});

		const res = await client.manager.search(query, { requester: interaction.user });

		if (!res || !res.tracks.length) {
			return interaction.editReply({ content: '❌ Nenhuma música encontrada para a sua busca.' });
		}

		if (res.type === 'PLAYLIST') {
			for (const track of res.tracks) {
				player.queue.add(track);
			}
			if (!player.playing && !player.paused) player.play();

			return interaction.editReply({
				embeds: [{
					color: 3501486,
					description: `📑 **Playlist adicionada:** [${res.playlistName}](${query}) (\`${res.tracks.length}\` faixas)`,
				}],
			});
		}

		const track = res.tracks[0];
		player.queue.add(track);
		if (!player.playing && !player.paused) player.play();

		const fact = getRandomFact(20);

		const embed = new EmbedBuilder()
			.setColor(3501486)
			.setAuthor({
				name: `${interaction.user.username} — Usuário do Servidor`,
				iconURL: interaction.user.displayAvatarURL(),
			})
			.setDescription(`🎶 **[${track.title}](${track.uri})** — \`${track.author}\``)
			.setThumbnail(track.thumbnail || null);

		if (fact) {
			embed.setFooter({ text: `${fact[0]}\n${capitalize(fact[1])}` });
		}

		return interaction.editReply({ embeds: [embed] });
	} catch (err) {
		console.error(err);
		return interaction.editReply({ content: '❌ Ocorreu um erro ao tentar reproduzir esta faixa.' });
	}
}
