export async function loadCommands(client) {
    // https://www.npmjs.com/package/ascii-table3
    const { AsciiTable3 } = await import('ascii-table3');
    const fs = await import('fs');
    const table = new AsciiTable3().setHeading('Commands', 'Status');

    const commandsArray = [];

    const commandsFolder = fs.readdirSync('./Commands');
    for (const folder of commandsFolder) {
        const commandFiles = fs.readdirSync(`./Commands/${folder}`).filter((file) => file.endsWith('js'));

        for (const file of commandFiles) {
            const commandFile = await import(`../Commands/${folder}/${file}`);

            // help.js properties
            const properties = { folder, ...commandFile };

            client.commands.set(commandFile.data.name, properties);

            commandsArray.push(commandFile.data.toJSON());

            table.addRow(file, 'loaded');
            continue;
        }
    }

    client.application.commands.set(commandsArray);
    return console.log(table.toString(), '\nLoaded Commands');
}