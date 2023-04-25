// import { CommandInteraction } from 'discord.js';

export default {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) {
            interaction.reply({ content: 'outdated command' });
        }

        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'Houve um erro durante a execução do comando!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'Houve um erro durante a execução do comando!', ephemeral: true });
            }
        }
    },
};