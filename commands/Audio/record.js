/* eslint-disable no-unused-vars */
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { generalErrorEmbed } from '../../Data/embeds.js';
import { EndBehaviorType, entersState, VoiceConnectionStatus, joinVoiceChannel } from '@discordjs/voice';
import * as prism from 'prism-media';
import { createWriteStream, unlinkSync } from 'fs';
import { pipeline } from 'stream';
import ffmpeg from 'ffmpeg';
const sleep = import('util');

export const data = new SlashCommandBuilder()
	.setName('record')
	.setDescription('Grava as coisas do canal de voz.');

function createListeningStream(receiver, userId, user) {
	console.log(prism.opus);
	const opusStream = receiver.subscribe(userId, {
		end: {
			behavior: EndBehaviorType.AfterSilence,
			duration: 100,
		},
	});

	const oggStream = new prism.opus.OggLogicalBitstream({
		opusHead: new prism.opus.OpusHead({
			channelCount: 2,
			sampleRate: 48000,
		}),
		pageSizeControl: {
			maxPackets: 10,
		},
	});

	const filename = `./recordings/${userId}.pcm`;

	const out = createWriteStream(filename, { flags: 'a' });
	console.log('Começando a gravar ' + filename);

	pipeline(opusStream, oggStream, out, (err) => {
		if (err) {
			console.warn('Erro ao gravar ' + filename + ' - ' + err.message);
		} else {
			console.log('Sucesso em gravar ' + filename);
		}
	});
}

// function convert(input, output, callback) {
//     ffmpeg(input)
//         .output(output)
//         .on('end', function() {
//             console.log('conversion ended');
//             callback(null);
//         }).on('error', function(err) {
//             console.log('error: ', err.code, err.msg);
//             callback(err);
//         }).run();
// }


export async function execute(interaction, client) {
	// const client = await import('../../index.js');
	const { member, guild } = interaction;

	const voiceChannel = member.voice.channel;
	const embed = new EmbedBuilder();
	let connection = await interaction.client.voiceManager.get(interaction.channel.guild.id);
	// console.log(interaction);

	if (!voiceChannel) {
		embed.setColor('Red').setDescription('Você precisa estar em um canal de voz!');
		return interaction.reply({ embeds: [embed], ephemeral: true });
	}

	try {
		if (!connection) {
			/* Join voice channel*/
			connection = joinVoiceChannel({
				channelId: voiceChannel.id,
				guildId: voiceChannel.guild.id,
				selfDeaf: false,
				selfMute: true,
				adapterCreator: voiceChannel.guild.voiceAdapterCreator,
			});

			/* Add voice state to collection */
			client.voiceManager.set(interaction.channel.guild.id, connection);
			await entersState(connection, VoiceConnectionStatus.Ready, 20e3);
			const receiver = connection.receiver;

			/* When user speaks in vc*/
			receiver.speaking.on('start', (userId) => {
				if (userId !== interaction.user.id) return;
				/* create live stream to save audio */
				createListeningStream(receiver, userId, client.users.cache.get(userId));
			});

			/* When user speaks in vc*/
			receiver.speaking.on('start', (userId) => {
				// if (userId !== interaction.author.id) return;
				/* create live stream to save audio */
				createListeningStream(receiver, userId, client.users.cache.get(userId));
			});

			return interaction.reply({ embeds: [{
				'fields': [],
				'color': 11418941,
				'title': `🎙️ I am now recording ${voiceChannel.name}`,
			}], ephemeral: true });

		} else if (connection) {
			/* Send waiting message */
			const msg = await interaction.channel.send('Please wait while I am preparing your recording...');
			/* wait for 5 seconds */
			// await sleep(5000);

			/* disconnect the bot from voice channel */
			connection.destroy();

			/* Remove voice state from collection */
			client.voiceManager.delete(interaction.channel.guild.id);

			const filename = `./recordings/${interaction.user.id}`;

			/* Create ffmpeg command to convert pcm to mp3 */
			const process = await new ffmpeg(`${filename}.pcm`);
			// console.log(process);

			// convert(`${filename}.pcm`, `${filename}.mp3`, function(err) {
			//     if (!err) {
			//         console.log('conversion complete');
			//         // ...
			//     }
			//  });


			// process.audio.fnExtractSoundToMP3(`${filename}.mp3`, async function(error, file) {
			//         // edit message with recording as attachment
			//         await msg.edit({
			//             content: '🔉 Here is your recording!',
			//             files: [(`./recordings/${interaction.user.id}.mp3`, 'recording.mp3')],
			//         });

			//         // delete both files
			//         unlinkSync(`${filename}.pcm`);
			//         unlinkSync(`${filename}.mp3`);
			//     });
		}

	} catch (err) {
		console.log(err);
		generalErrorEmbed.description = 'Ocorreu um erro, verifique o seu comando...';
		return interaction.reply({ embeds: [generalErrorEmbed], ephemeral: true });
	}
}