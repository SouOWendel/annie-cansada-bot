export async function loadEvents(client) {
	const { AsciiTable3 } = await import('ascii-table3');
	const fs = await import('fs');
	const table = new AsciiTable3().setHeading('Events', 'Status');

	const folders = fs.readdirSync('./Events');
	for (const folder of folders) {
		const files = fs.readdirSync(`./Events/${folder}`).filter((file) => file.endsWith('js'));

		for (const file of files) {
			const event = await import(`../Events/${folder}/${file}`);
			if (event.default.rest) {
				if (event.default.once) {
					client.rest.once(event.default.name, (...args) => event.default.execute(...args, client));
				} else {
					client.rest.on(event.default.name, (...args) => event.default.execute(...args, client));
				}
			} else if (event.default.once) {
				client.once(event.default.name, (...args) => event.default.execute(...args, client));
			} else {
				client.on(event.default.name, (...args) => event.default.execute(...args, client));
			}
			table.addRow(file, 'loaded');
		}
	}
	return console.log(table.toString(), 'Eventos carregados com sucesso!');
}