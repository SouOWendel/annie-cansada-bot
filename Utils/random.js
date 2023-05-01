// Um método simples que retorna um emoji aleatório. Quero adicionar tipos de emoções no futuro como parametro e ifs.
export function getRandomEmoji() {
    const emojiList = ['😭', '😄', '😌', '🤓', '😎', '😤', '🤖', '😶‍🌫️', '🌏', '📸', '💿', '👋', '🌊', '✨'];
    return emojiList[Math.floor(Math.random() * emojiList.length)];
  }

  // Retorna um número aleatório baseado na quantidade de números.
  export function getRandomNumber(limit) {
    return Math.floor(Math.random() * limit);
  }