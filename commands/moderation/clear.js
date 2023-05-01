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


    const messages = await channel.messages.fetch({ limit: amount + 1 });

    const res = new EmbedBuilder().setColor(0x5fb041);

    if (target) {
        let i = 0;
        const filtered = [];
        (await messages).filter((msg) => {
            if (msg.author.id === target.id && amount > i) {
                filtered.push(msg);
                i++;
            }
        });
        // console.log('filtered');
        // console.log(filtered);

        await channel.bulkDelete(filtered).then(mensagem => {
            res.setDescription(`Deletei com sucesso ${mensagem.size} mensagens de ${target}`);
            interaction.reply({ embeds: [res] });
        });
    } else {
        await channel.bulkDelete(amount, true).then(mensagem => {
            res.setDescription(`Deletei com sucesso ${mensagem.size} mensagens desse canal.`);
            interaction.reply({ embeds: [res] });
        });
    }
}