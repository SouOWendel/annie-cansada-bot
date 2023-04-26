import { EmbedBuilder } from '@discordjs/builders';
// eslint-disable-next-line no-unused-vars
import { GuildMember, Embed } from 'discord.js';

export default {
    name: 'guildMemberAdd',
    async execute(member) {
        // eslint-disable-next-line no-unused-vars
        const { user, guild } = member;
        const welcomeChannel = member.guild.channels.cache.get('1100292682061971456');
        const welcomeMessage = `Bem-vindo <${member.id}> ao servidor!`;
        const memberRole = '1100295395009105973';

        const welcomeEmbed = new EmbedBuilder()
        .setTitle('Novo Membro')
        .setDescription(welcomeMessage)
        .setColor(0x037821)
        .addFields({ name: 'Total de Membros', value: `${guild.memberCount}` })
        .setTimestamp();

        welcomeChannel.send({ embeds: [welcomeEmbed] });
        member.roles.add(memberRole);
    },
};