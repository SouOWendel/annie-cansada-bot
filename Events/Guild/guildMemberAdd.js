import { EmbedBuilder } from '@discordjs/builders';
// eslint-disable-next-line no-unused-vars
import { GuildMember, Embed } from 'discord.js';

export default {
	name: 'guildMemberAdd',
	async execute(member) {
		// eslint-disable-next-line no-unused-vars
		const { user, guild } = member;
		console.log(member);
		console.log(guild);
		const welcomeChannel = await member.guild.channels.cache.get(guild.systemChannelId);
		const welcomeMessage = `Bem-vindo <${member.user.username}> ao servidor!`;
		const memberRole = undefined;

		const welcomeEmbed = new EmbedBuilder()
			.setTitle('Novo Membro')
			.setDescription(welcomeMessage)
			.setColor(0x037821)
			.addFields({ name: 'Total de Membros', value: `${guild.memberCount}` })
			.setTimestamp();

		welcomeChannel.send({ embeds: [welcomeEmbed] });

		if (memberRole) member.roles.add(memberRole);
	},
};