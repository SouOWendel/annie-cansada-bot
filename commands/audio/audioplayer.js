import { Client, GuildVoiceStates } from 'discord.js';
import { generateDependencyReport, VoiceConnectionStatus, AudioPlayerStatus, entersState, joinVoiceChannel } from '@discordjs/voice';

// Create a new client instance
const player = new Client({ intents: [GuildVoiceStates] });

async function start() {
	player.play(resource);
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