import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('pause')
	.setDescription('Pausa uma música ou som!');

export async function execute(interaction) {
    // const client = await import('../../index.js');
	const { member, guild } = interaction;

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

        await queue.pause(voiceChannel);
        embed.setColor('Orange').setDescription('O som foi pausado.');
        return interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (err) {
        console.log(err);
        embed.setColor('Red').setDescription('Ocorreu algo de errado...');
        return interaction.reply({ embeds: [embed], ephemeral: true });
    }
}