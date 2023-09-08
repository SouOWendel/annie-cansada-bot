import { facts } from '../Data/dataFatos.js';

// Um método simples que retorna um emoji aleatório. Quero adicionar tipos de emoções no futuro como parametro e ifs.
export function getRandomEmoji() {
	const emojiList = ['😭', '😄', '😌', '🤓', '😎', '😤', '🤖', '😶‍🌫️', '🌏', '📸', '💿', '👋', '🌊', '✨'];
	return emojiList[Math.floor(Math.random() * emojiList.length)];
}

// Retorna um número aleatório baseado na quantidade de números.
export function getRandomNumber(limit) {
	return Math.floor(Math.random() * limit);
}

// Método para retornar uma curiosidade aleatória.
export function getRandomFact(probabilidade) {
	const n = getRandomNumber(100);
	const array_position = getRandomNumber(facts.length);

	// Se a probabilidade é maior do que o número aleatório 'n'. Deve-se retornar um fato.

	if (probabilidade >= n) return facts[array_position];
	else return null;
}
