/* eslint-disable brace-style */
import { Client, GuildVoiceStates, SlashCommandBuilder } from 'discord.js';
import { AudioPlayerStatus, entersState } from '@discordjs/voice';

export const data = new SlashCommandBuilder()
	.setName('play')
	.setDescription('O comando que seria para tocar um áudio.');

// Create a new client instance
const player = new Client({ intents: [GuildVoiceStates] });

const audiourl = './MachampMaconha(128kbps).ogg';

async function start(audio) {
	player.play(audio);
	try {
		await entersState(player, AudioPlayerStatus.Playing, 5_000);
		// The player has entered the Playing state within 5 seconds
		console.log('Playback has started!');
	} catch (error) {
		// The player has not entered the Playing state and either:
		// 1) The 'error' event has been emitted and should be handled
		// 2) 5 seconds have passed
		console.error(error);
	}
}
void start();
export async function execute(interaction) {
    await interaction.reply(start(audiourl));
    console.log('Tocando... Nome do áudio: ' + audiourl);
}