/* eslint-disable no-unused-vars */
import { Client, SlashCommandBuilder } from 'discord.js';
import { VoiceConnectionStatus, AudioPlayerStatus, joinVoiceChannel, entersState, createAudioPlayer } from '@discordjs/voice';

// Função para verificação de dependências essenciais e opcionais.
// console.log(generateDependencyReport());

// Guide https://github.com/discordjs/voice-examples/blob/main/basic/src/main.ts

const player = createAudioPlayer();

export const data = new SlashCommandBuilder()
	.setName('entrar')
	.setDescription('Comando para entrar no canal de voz.');

export async function execute(client, interaction, message) {
	console.log('O ID de usuário é: ' + interaction.client.user.id);
	console.log('O ID do servidor é: ' + interaction.guild.id);

	// Servidor
	const guild = await interaction.client.guilds.fetch(interaction.guild.id);
	// Usuario
	const guildMember = await guild.members.fetch(interaction.client.user.id);
	// Canal de Voz
	console.log('O ID do canal de voz é: ' + guildMember.voice.channelId);

	if (!guildMember) return interaction.reply('You need to be in a Voice Channel to play a song.');

	const connection = joinVoiceChannel({
		channelId: guildMember.voice.channelId,
		guildId: interaction.guild.id,
		adapterCreator: interaction.guild.voiceAdapterCreator,
	});
	console.log('a2');
	// connection.on(VoiceConnectionStatus.Ready, (oldState, newState) => {
	// 	console.log('Connection is in the Ready state!');
	// });

	// player.on(AudioPlayerStatus.Playing, (oldState, newState) => {
	// 	console.log('Audio player is in the Playing state!');
	// });

		/**
		 * Allow ourselves 30 seconds to join the voice channel. If we do not join within then,
		 * an error is thrown.
		 */
		await entersState(connection, VoiceConnectionStatus.Ready, 30_000);
		console.log('a3');
		/**
		 * At this point, the voice connection is ready within 30 seconds! This means we can
		 * start playing audio in the voice channel. We return the connection so it can be
		 * used by the caller.
		 */
		connection.subscribe(player);
		console.log('a4');
		await interaction.reply(`A conexão foi feita em ${interaction.channel.id}.`);

}