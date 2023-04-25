export async function loadEvents(client) {
    // https://www.npmjs.com/package/ascii-table3
    const { AsciiTable3 } = await import('ascii-table3');
    const fs = await import('fs');
    const table = new AsciiTable3().setHeading('Events', 'Status');

    const folders = fs.readdirSync('./Events');
    for (const folder of folders) {
        const files = fs.readdirSync(`./Events/${folder}`).filter((file) => file.endsWith('js'));

        for (const file of files) {
            const event = import(`../Events/${folder}/${file}`);

            if (event.rest) {
                if (event.once) {
                    client.rest.once(event.name, (...args) =>
                    event.execute(...args, client));
                } else {
                    client.rest.on(event.name, (...args) =>
                    event.execute(...args, client));
                }
            } else if (event.once) {
                    client.once(event.name, (...args) => event.execute(...args, client));
                } else {
                    client.on(event.name, (...args) => event.execute(...args, client));
                }
            table.addRow(file, 'loaded');
            continue;
        }
    }
    return console.log(table.toString(), '\nLoaded events');
}