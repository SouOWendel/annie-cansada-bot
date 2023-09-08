/* eslint-disable no-unused-vars */

// ERROS DO NODE PROCESS
// https://nodejs.org/api/process.html
export async function loadErrorHandler(client) {
	// https://www.npmjs.com/package/ascii-table3
	const { AsciiTable3 } = await import('ascii-table3');
	const fs = await import('fs');
	const table = new AsciiTable3().setHeading('Events', 'Status');

	process.on('unhandledRejection', (reason, p) => {
		console.log('\n[MAGI ANTI CRASH-SYSTEM] :: Unhandle Rejection/Catch');
		console.error('ERRO:', reason, p, '');
	});

	process.on('uncaughtException', (err, origin) => {
		console.log('\n[MAGI ANTI CRASH-SYSTEM] :: Uncaught Exception/Catch');
		console.error('ERRO:', err, origin);
	});

	process.on('uncaughtExceptionMonitor', (err, origin) => {
		console.log('\n[MAGI ANTI CRASH-SYSTEM] :: Uncaught Exception/Catch Monitor');
		console.error('ERRO:', err, origin);
	});

	// DEPRECATED
	// process.on('multipleResolves', (type, promise, reason) => {
	//     console.log('[MAGI ANTI CRASH-SYSTEM] :: Multiple Resolves');
	//     console.error('ERRO:', type, promise, reason);
	// });
}