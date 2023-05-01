import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('volume')
    .setDescription('Ajuste o volume do som.')
    .addIntegerOption(option =>
        option.setName('percent')
        .setDescription('10 = 10%')
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(true));

export async function execute(interaction) {
    // const client = await import('../../index.js');
	const { member, guild, options } = interaction;

    const volume = options.getInteger('percent');
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
        interaction.client.distube.setVolume(voiceChannel, volume);
        return interaction.reply({ content: `Volume foi setado para **${volume}**.` });
    } catch (err) {
        console.log(err);
        embed.setColor('Red').setDescription('Ocorreu algo de errado...');
        return interaction.reply({ embeds: [embed], ephemeral: true });
    }
}