import { Client, Events, GatewayIntentBits } from 'discord.js';
import token from './config.json';
import 'dotenv/config';
import express from 'express';
// import eris from 'eris';
import { InteractionType, InteractionResponseType, InteractionResponseFlags, MessageComponentTypes, ButtonStyleTypes } from 'discord-interactions';
import { VerifyDiscordRequest, getRandomEmoji, DiscordRequest } from './utils.js';
// import { playSong, connectToChannel } from './audio.js';
// import { getShuffledOptions, getResult } from './game.js';

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;
// Parse request body and verifies incoming requests using discord-interactions package
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

// Store for in-progress games. In production, you'd want to use a DB
const activeGames = {};

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 */
app.post('/interactions', async function (req, res) {
	// Interaction type and data
	const { type, id, data } = req.body;

	/**
   * Handle verification requests
   */
	if (type === InteractionType.PING) {
		return res.send({ type: InteractionResponseType.PONG });
	}

	/**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
	if (type === InteractionType.APPLICATION_COMMAND) {
		const { name } = data;

		// "test" command
		if (name === 'testar') {
			// Send a message into the channel where command was triggered from
			return res.send({
				type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
				data: {
					// Fetches a random emoji to send from a helper function
					content: 'hello world ' + getRandomEmoji(),
				},
			});
		}

		// "crias" command
		if (name === 'crias') {
			return res.send({
				type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
				data: {
					content: 'Um comando de cria. XD',
				},
			});
		}

		// "entrar" command
		if (name === 'entrar') {
			return res.send({
				type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
				data: {
					content: 'Um comando de cria. XD',
				},
			});
		}

	}
});


// // When the bot is connected and ready, log to console.
// client.on('ready', async () => {
// 	console.log('Conectada, cansada e pronta.');

// 	// try {
// 	// 	await playSong();
// 	// 	console.log('Song is ready to play!');
// 	// } catch (error) {
// 	// 	console.error(error);
// 	// }
// });

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Every time a message is sent anywhere the bot is present,
// this event will fire and we will check if the bot was mentioned.
// If it was, the bot will attempt to respond with "Present".
client.on('messageCreate', async (msg) => {
	const botWasMentioned = msg.mentions.find(
		mentionedUser => mentionedUser.id === client.user.id,
	);

	if (botWasMentioned) {
		try {
			await msg.channel.createMessage('Quié 😤');
		} catch (err) {
			// There are various reasons why sending a message may fail.
			// The API might time out or choke and return a 5xx status,
			// or the bot may not have permission to send the
			// message (403 status).
			console.warn('Failed to respond to mention.');
			console.warn(err);
		}
	}
});

// bot.on('message', async (message) => {
// 	if (!message.guild) return;

// 	if (message.content === '-join') {
// 		const channel = message.member?.voice.channel;

// 		if (channel) {
// 			try {
// 				const connection = await connectToChannel(channel);
// 				connection.subscribe(player);
// 				message.reply('Playing now!');
// 			} catch (error) {
// 				console.error(error);
// 			}
// 		} else {
// 			message.reply('Join a voice channel then try again!');
// 		}
// 	}
// });


client.on('error', err => {
	console.warn(err);
});

client.login(token);

app.listen(PORT, () => {
	console.log('Escutando na porta:', PORT);
});
