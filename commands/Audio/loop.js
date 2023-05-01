import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('loop')
	.setDescription('Comando para entrar no modo loop.')
    .addStringOption(option =>
        option.setName('options')
        .setDescription('Opções de loop: off, song, queue')
        .addChoices(
            { name: 'off', value: 'off' },
            { name: 'song', value: 'song' },
            { name: 'queue', value: 'queue' },
        )
        .setRequired(true),
    );

export async function execute(interaction) {
    // const client = await import('../../index.js');
	const { member, guild, options } = interaction;

    const option = options.getString('options');
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

        let mode = null;

        switch (option) {
            case 'off':
                mode = 0;
                break;
            case 'song':
                mode = 1;
                break;
            case 'queue':
                mode = 2;
                break;
        }

        mode = await queue.setRepeatMode(mode);
        mode = mode ? (mode === 2 ? 'Repeat queue' : 'Repeat song') : 'Off';
        embed.setColor('Orange').setDescription(`Set Repeat Mode para: \`${mode}\`.`);
        return interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (err) {
        console.log(err);
        embed.setColor('Red').setDescription('Ocorreu algo de errado...');
        return interaction.reply({ embeds: [embed], ephemeral: true });
    }
}