export default {
	name: 'playerStart',
	execute(player, track) {
		console.log(`🎶 Tocando agora: ${track.title}`);
	},
};