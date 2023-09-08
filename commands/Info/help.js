import {
	EmbedBuilder,
	SlashCommandBuilder,
	ActionRowBuilder,
	StringSelectMenuBuilder,
	ComponentType,
} from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('help')
	.setDescription('Receba uma lista de todas as qualidades da Annie (comandos) e seus pontos fortes.');

export async function execute(interaction) {
	const emojis = {
		info: '📜',
		moderation: '🔮',
		fun: '🧸',
		audio: '🎶',
		utility: '💻',
		rpg: '🎲',
	};

	const directories = [
		...new Set(interaction.client.commands.map((cmd) => cmd.folder)),
	];

	const formatString = (str) =>
		`${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

	const categories = directories.map((dir) => {
		const getCommands = interaction.client.commands
			.filter((cmd) => cmd.folder === dir)
			.map((cmd) => {
				return {
					name: cmd.data.name,
					description:
                    cmd.data.description ||
                    'There is no description for this command.',
				};
			});

		return {
			directory: formatString(dir),
			commands: getCommands,
		};
	});

	const embed = new EmbedBuilder().setDescription('Por favor, selecione a categoria no menu suspenso.');

	const components = (state) => [
		new ActionRowBuilder().addComponents(
			new StringSelectMenuBuilder()
				.setCustomId('help-menu')
				.setPlaceholder('Por favor, selecione a categoria:')
				.setDisabled(state)
				.addOptions(
					categories.map((cmd) => {
						return {
							label: cmd.directory,
							value: cmd.directory.toLowerCase(),
							description: `Comandos da categoria ${cmd.directory}`,
							emoji: emojis[cmd.directory.toLowerCase() || null],
						};
					}),
				),
		),
	];

	const initialMessage = await interaction.reply({
		embeds: [embed],
		components: components(false),
	});

	// eslint-disable-next-line no-shadow
	const filter = (interaction) => interaction.user.id === interaction.member.id;

	const collector = interaction.channel.createMessageComponentCollector({
		filter,
		componentType: ComponentType.StringSelect,
	});

	// eslint-disable-next-line no-shadow
	collector.on('collect', (interaction) => {
		const [directory] = interaction.values;
		const category = categories.find(
			(x) => x.directory.toLowerCase() === directory,
		);

		const categoryEmbed = new EmbedBuilder()
			.setTitle(`${formatString(directory)} comandos.`)
			.setDescription(`Uma lista de todos os comandos categorizados em ${directory}`)
			.addFields(
				category.commands.map((cmd) => {
					return {
						name: `\`${cmd.name}\``,
						value: cmd.description,
						inline: true,
					};
				}),
			);

		interaction.update({ embeds: [categoryEmbed] });
	});

	collector.on('end', () => {
		initialMessage.edit({ components: components(true) });
	});
}