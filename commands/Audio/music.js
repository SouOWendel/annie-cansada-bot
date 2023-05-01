import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('music')
	.setDescription('music!')
    .addSubcommand(subcommand =>
        subcommand.setName('play')
        .setDescription('Tocar um som')
        .addStringOption(option =>
            option.setName('query')
            .setDescription('Nome ou URL do som.')
            .setRequired(true),
        ),
    )
    .addSubcommand(subcommand =>
        subcommand.setName('volume')
        .setDescription('Ajuste o volume do som.')
        .addIntegerOption(option =>
            option.setName('percent')
            .setDescription('10 = 10%')
            .setMinValue(1)
            .setMaxValue(100)
            .setRequired(true),
        ),
    )
    .addSubcommand(subcommand =>
        subcommand.setName('options')
        .setDescription('Selecione uma opção:')
        .addStringOption(option =>
            option.setName('options')
            .setDescription('Selecione uma opção:')
            .setRequired(true)
            .addChoices(
                { name: 'queue', value: 'queue' },
                { name: 'skip', value: 'skip' },
                { name: 'pause', value: 'pause' },
                { name: 'resume', value: 'resume' },
                { name: 'stop', value: 'stop' },
                ),
        ),
    );

export async function execute(interaction) {
    // const client = await import('../../index.js');
	const { options, member, guild, channel } = interaction;

    const subcommand = options.getSubcommand();
    const query = options.getString('query');
    const volume = options.getInteger('percent');
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
        switch (subcommand) {
            case 'play':
                console.log(`Canal de voz: ${voiceChannel} Query:${query} Canal:${channel} Pessoa:${member}`);
                interaction.client.distube.play(voiceChannel, query, { textChannel: channel, member: member });
                return interaction.reply({ content: 'Requisição recebida.' });
            case 'volume':
                interaction.client.distube.setVolume(voiceChannel, volume);
                return interaction.reply({ content: `Volume foi setado para **${volume}**.` });
            case 'options':
                // eslint-disable-next-line no-case-declarations
                const queue = await interaction.client.distube.getQueue(voiceChannel);

                if (!queue) {
                    embed.setColor('Red').setDescription('Não há queue ativa no momento.');
                    return interaction.reply({ embeds: [embed], ephemeral: true });
                }

                switch (option) {
                    case 'skip':
                        await queue.skip(voiceChannel);
                        embed.setColor('Blue').setDescription('O som foi pulado.');
                        return interaction.reply({ embeds: [embed], ephemeral: true });
                    case 'stop':
                        await queue.stop(voiceChannel);
                        embed.setColor('Red').setDescription('A queue foi parada.');
                        return interaction.reply({ embeds: [embed], ephemeral: true });
                    case 'pause':
                        await queue.pause(voiceChannel);
                        embed.setColor('Orange').setDescription('O som foi pausado.');
                        return interaction.reply({ embeds: [embed], ephemeral: true });
                    case 'resume':
                        await queue.resume(voiceChannel);
                        embed.setColor('Green').setDescription('O som foi retomado.');
                        return interaction.reply({ embeds: [embed], ephemeral: true });
                    case 'queue':
                        embed.setColor('Purple').setDescription(`${queue.songs.map(
                            (song, id) => `\n**${id + 1}.** ${song.name} -\`${song.formattedDuration}\``,
                        )}`);
                        return interaction.reply({ embeds: [embed], ephemeral: true });
                }
        }
    } catch (err) {
        console.log(err);
        embed.setColor('Red').setDescription('Ocorreu algo de errado...');
        return interaction.reply({ embeds: [embed], ephemeral: true });
    }
}