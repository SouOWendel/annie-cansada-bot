import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('limpar')
	.setDescription('A Annie limpa tudo que você quiser utilizando magia.')
	.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
	.addIntegerOption(option =>
		option.setName('quantidade')
			.setDescription('Quantidade de mensagens que deseja limpar.')
			.setRequired(true))
	.addUserOption(option =>
		option.setName('alvo')
			.setDescription('Selecione o alvo da magia de destruição de mensagens.')
			.setRequired(false));

export async function execute(interaction) {
	const { channel, options } = interaction;

	const amount = options.getInteger('quantidade');
	const target = options.getUser('alvo');

	const messages = await channel.messages.fetch();
	const res = new EmbedBuilder().setColor(0x5fb041);

	if (amount == 0 || amount == null || amount == undefined) {
		res.setColor('Red').setDescription('Você precisa de um número de mensagens diferente de zero.');
		return interaction.reply({ embeds: [res], ephemeral: true });
	}

	if (target) {
		const msgtarget = messages.filter(m => m.author.id === target.id);
		const filtered = msgtarget.firstKey(amount);
		await channel.bulkDelete(filtered).then(mensagem => {
			interaction.reply({ embeds: [{
				'color': 8725421,
				'author': {
					'name': `Deletei com sucesso ${mensagem.size} ${(amount == 1) ? 'mensagem' : 'mensagens'} de ${target}.`,
					'icon_url': 'https://media.tenor.com/ubNXWP4qEPgAAAAi/netzuito1.gif',
				},
			}] });
		});
	} else {
		await channel.bulkDelete(amount, true).then(mensagem => {
			interaction.reply({ embeds: [{
				'fields': [],
				'description': '',
				'color': 8725421,
				'author': {
					'name': `Deletei com sucesso ${mensagem.size} ${(amount == 1) ? 'mensagem' : 'mensagens'} desse canal.`,
					'icon_url': 'https://media.tenor.com/ubNXWP4qEPgAAAAi/netzuito1.gif',
				},
			}] });
		});
	}
}