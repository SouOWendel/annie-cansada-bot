import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('play')
	.setDescription('Toca uma música ou som!')
    .addStringOption(option =>
        option.setName('query')
        .setDescription('Nome ou URL do som.')
        .setRequired(true),
    );

export async function execute(interaction) {
    // const client = await import('../../index.js');
	const { options, member, guild, channel } = interaction;

    // console.log(interaction);
    const query = options.getString('query');
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
        console.log(`Canal de voz: ${voiceChannel} Query: ${query} Canal: ${channel} Pessoa: ${member}`);

        await interaction.client.distube.play(voiceChannel, query, { textChannel: channel, member: member });
        // const queue = await interaction.client.distube.getQueue(voiceChannel);
        // console.log(queue);
        return interaction.reply({ content: 'Requisição recebida.' });
    } catch (err) {
        console.log(err);
        embed.setColor('Red').setDescription('Ocorreu algo de errado...');
        return interaction.reply({ embeds: [embed], ephemeral: true });
    }
}