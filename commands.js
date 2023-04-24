import 'dotenv/config';
import { getRPSChoices } from './game.js';
import { capitalize, InstallGlobalCommands } from './utils.js';

// Get the game choices from game.js
function createCommandChoices() {
  const choices = getRPSChoices();
  const commandChoices = [];

  for (let choice of choices) {
    commandChoices.push({
      name: capitalize(choice),
      value: choice.toLowerCase(),
    });
  }

  return commandChoices;
}

// Simple test command
const TEST_COMMAND = {
  name: 'testar',
  description: 'Basic command',
  type: 1,
};

// Simple test command
const CRIANDOCOMANDO = {
  name: 'crias',
  description: 'Um comando de cria.',
  type: 1,
};

// Entrar no canal de voz.
const ENTRAR = {
  name: 'entrar',
  description: 'Um comando de cria.',
  type: 1,
};

// Command containing options
const CHALLENGE_COMMAND = {
  name: 'challenge',
  description: 'Um desafio de pedra, papel ou tesoura.',
  options: [
    {
      type: 3,
      name: 'object',
      description: 'Pick your object',
      required: true,
      choices: createCommandChoices(),
    },
  ],
  type: 1,
};

const ALL_COMMANDS = [TEST_COMMAND, CHALLENGE_COMMAND, CRIANDOCOMANDO, ENTRAR];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);