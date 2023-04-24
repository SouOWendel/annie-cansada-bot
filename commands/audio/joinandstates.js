import { Client, GuildVoiceStates, SlashCommandBuilder } from 'discord.js';
import { generateDependencyReport, VoiceConnectionStatus, AudioPlayerStatus, entersState, joinVoiceChannel } from '@discordjs/voice';

// Função para verificação de dependências essenciais e opcionais.
// console.log(generateDependencyReport());

export const data = new SlashCommandBuilder()
	.setName('server')
	.setDescription('Provides information about the server.');

// Create a new client instance
const player = new Client({ intents: [GuildVoiceStates] });

void start();

export async function execute(interaction) {

	const connection = joinVoiceChannel({
		channelId: interaction.channel.id,
		guildId: interaction.guild.id,
		adapterCreator: interaction.guild.voiceAdapterCreator,
	});

	connection.on(VoiceConnectionStatus.Ready, (oldState, newState) => {
		console.log('Connection is in the Ready state!');
	});

	player.on(AudioPlayerStatus.Playing, (oldState, newState) => {
		console.log('Audio player is in the Playing state!');
	});

	await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
}