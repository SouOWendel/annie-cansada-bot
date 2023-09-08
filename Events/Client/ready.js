/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { ActivityType, Client } from 'discord.js';
import { usagePercent } from 'cpu-stat';
import { ExtractorPlugin } from 'distube';
import { EpicFreeGames } from 'epic-free-games';
const ObservableSlim = import('observable-slim');

/*
https://github.com/ElliotNB/observable-slim/blob/master/test/test.js
https://stackoverflow.com/questions/1759987/listening-for-variable-changes-in-javascript
https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions
https://stackoverflow.com/questions/63321678/discord-bot-send-dm-to-someone-using-the-person-ids
*/

export default {
	name: 'ready',
	once: true,
	async execute(interaction, client) {
		const { channel, guild, member } = interaction;

		const description = {
			annie: 'Devilline HQ — Character',
			beatrice: 'Re:Zero Waifu',
		};

		if (client.user.username == 'Beatrice') client.user.setActivity(description.beatrice, { type: ActivityType.Playing });
		else if (client.user.username == 'Annie Cansada') client.user.setActivity(description.annie, { type: ActivityType.Playing });

		const epicFreeGames = new EpicFreeGames({ country: 'BR', locale: 'pt-BR', includeAll: true });

		// Manda uma mensagem na DM utilizando um ID.
		// const usera = await client.users.fetch('294989840104161280');
		// epicFreeGames.getGames().then(res => {
		//     const infoGamesWeek = [];
		//     for (let i = 0; i < res.currentGames.length; i++) {
		//         infoGamesWeek.push({
		//             name: res.currentGames[i].title,
		//             description: res.currentGames[i].description,
		//             pageSlug: res.currentGames[i].catalogNs.mappings[0].pageSlug,
		//             price: res.currentGames[i].price.totalPrice.fmtPrice.originalPrice,
		//             endDate: res.currentGames[i].price.lineOffers[0].appliedRules[0],
		//         });
		//     }
		//     client.users.send(usera, {
		//         content: 'Olá, meu amigo, este é o relatório `001#` ✨\nVocê está recebendo uma atualização dos novos jogos gratuitos lançados na Epic Games. Não se esqueça de adquiri-los antes da data limite de 31/01/2001.',

		//         files: [{ attachment: 'https://i.imgur.com/M2tG1rc.png' }, { attachment: 'https://i.imgur.com/M2tG1rc.png' }, { attachment: 'https://i.imgur.com/M2tG1rc.png' }],

		//         embeds: [{
		//             'fields': [],
		//             'description': '[**Against All Odds**](https://store.epicgames.com/pt-BR/p/against-all-odds-409105) \n[**Kao The Kangaroo**](https://store.epicgames.com/pt-BR/p/kao-the-kangaroo-62abe3)\n[**Horizon Chase Turbo**](https://store.epicgames.com/en-US/p/horizon-chase-turbo)',
		//             'timestamp': '2023-05-11T15:00:00-03:00',
		//             'color': 3501486,
		//             'footer': {
		//                 'text': 'PROMOÇÃO VÁLIDA ATÉ',
		//             },
		//             'author': {
		//                 'name': '',
		//                 'icon_url': 'https://i.imgur.com/SIsC62b.png',
		//             },
		//         }],
		//   }).catch(err => {
		//     console.log(err);
		//   });
		// });


		//           const test = { testing:{} };
		// const p = ObservableSlim.create(test, true, function(changes) {
		//     console.log(JSON.stringify(changes));
		// });

		// p.testing.blah = 42;

		setTimeout(async () => {
			console.log(`\n${client.user.username} agora está online.`);
			console.log(`Status: ${(client.user.username == 'Beatrice') ? description.beatrice : description.annie}.`);
		}, 200);

	},
};