/* eslint-disable no-unused-vars */
import { Client, GuildVoiceStates, SlashCommandBuilder } from 'discord.js';
import { VoiceConnectionStatus, AudioPlayerStatus, joinVoiceChannel } from '@discordjs/voice';

// Função para verificação de dependências essenciais e opcionais.
// console.log(generateDependencyReport());

export const data = new SlashCommandBuilder()
	.setName('entrar')
	.setDescription('Comando para entrar no canal de voz.');

// Create a new client instance
const player = new Client({ intents: [GuildVoiceStates] });

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

	await interaction.reply(`A conexão foi feita em ${interaction.channel.id}.`);
}