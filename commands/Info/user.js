import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('user')
	.setDescription('A Annie fala sobre você. Talvez de um modo bem técnico e suspeito.');

export async function execute(interaction) {
	// interaction.user is the object representing the User who ran the command
	// interaction.member is the GuildMember object, which represents the user in the specific guild
	interaction.user.send('Seu bobo. https://media.discordapp.net/attachments/381832868910989314/1103850128659468309/image.png');
	await interaction.reply(`Esse comando foi enviado por ${interaction.user.username}, que entrou no servidor em ${interaction.member.joinedAt}.`);
}