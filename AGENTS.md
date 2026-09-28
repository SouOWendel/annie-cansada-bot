# AGENTS.md - Annie Cansada Bot

Documento de referência e diretrizes técnicas para agentes de IA e desenvolvedores que trabalham no repositório **Annie Cansada Bot**.

---

## 📌 Visão Geral do Projeto

**Annie Cansada** é um bot multifuncional para o Discord inspirado na personagem de *Devilline HQ*. O bot oferece módulos de entretenimento, utilitários, moderação, RPG e um player de áudio escalável integrado ao **Lavalink v4**.

* **Linguagem & Runtime:** Node.js (v20+ / v22+ recomendado, compatível com Node 24), ES Modules (`"type": "module"`).
* **Framework Principal:** [discord.js](https://discord.js.org/) v14.
* **Sistema de Áudio:** [Lavalink v4](https://github.com/lavalink-devs/Lavalink) (via Docker) + [Kazagumo](https://github.com/Takiyo0/Kazagumo) & [Shoukaku](https://github.com/Deivu/Shoukaku) (Cliente Node.js).
* **Containerização:** Docker & Docker Compose.

---

## 🏗️ Estrutura do Diretório

```plaintext
annie-cansada-bot/
├── commands/               # Slash Commands organizados por categorias
│   ├── Audio/              # Comandos de reprodução e controle de música (Lavalink/Kazagumo)
│   ├── Fun/                # Comandos de diversão e piadas
│   ├── Info/               # Informações do bot, servidor, uptime e /help
│   ├── RPG/                # Sistema de RPG e rolagem de dados (/1d6)
│   ├── Utility/            # Utilitários gerais (ex: dicionário)
│   ├── moderation/         # Moderação (limpar chat, recarregar comandos)
│   └── Inativos/           # Comandos desativados/rascunhos
├── Data/                   # Dados estáticos, constantes e templates de embeds
├── Events/                 # Ouvintes de eventos do Discord e do Gateway
│   ├── Client/             # ready, mentioned, guildCreate
│   ├── Guild/              # guildMemberAdd
│   └── interactions/       # interactionCreate (execução de slash commands)
├── Handlers/               # Carregadores dinâmicos de comandos, eventos e erros
│   ├── commandHandler.js   # Registro de Slash Commands na API do Discord
│   ├── errorHandler.js     # Tratamento de exceções não capturadas
│   └── eventHandler.js     # Registro automático de listeners em client.on()
├── Utils/                  # Funções utilitárias auxiliares (string, random, etc.)
├── application.yml         # Configurações do servidor Lavalink v4
├── docker-compose.yml      # Orquestração do Bot + Lavalink
├── Dockerfile              # Imagem de produção do Bot (Node.js LTS)
├── index.js                # Ponto de entrada (Entrypoint)
└── .env                    # Variáveis de ambiente e credenciais locais (ignorado no Git)
```

---

## ⚙️ Variáveis de Ambiente (`.env`)

| Variável | Descrição | Exemplo |
| :--- | :--- | :--- |
| `DISCORD_TOKEN` | Token secreto do Bot gerado no Discord Developer Portal | `OT...` |
| `CLIENT_ID` | Application ID do Bot no Discord | `1234567890...` |
| `LAVALINK_HOST` | Endereço do nó Lavalink (`lavalink` no Docker, `localhost` local) | `lavalink` / `localhost` |
| `LAVALINK_PORT` | Porta do Lavalink | `2333` |
| `LAVALINK_PASSWORD` | Senha de autenticação do Lavalink | `youshallnotpass` |
| `LAVALINK_SECURE` | Usar SSL/WSS (`true`/`false`) | `false` |
| `SPOTIFY_CLIENT_ID` | (Opcional) Client ID do Spotify Developer | `...` |
| `SPOTIFY_CLIENT_SECRET`| (Opcional) Client Secret do Spotify Developer | `...` |

---

## 🚀 Como Executar o Projeto

### Modo 1: Com Docker (Recomendado - Bot + Lavalink)
```bash
# Inicia os containers em segundo plano construindo a imagem do bot
docker compose up --build

# Para parar os containers
docker compose down
```

### Modo 2: Desenvolvimento Local (Apenas Node.js)
*Certifique-se de que o Lavalink está rodando separadamente em `localhost:2333`.*
```bash
# Instalar dependências
npm install

# Iniciar em modo desenvolvimento (com recarregamento automático)
npm run dev

# Iniciar em modo produção
npm start
```

---

## 📜 Convenções e Regras para Agentes

Ao modificar ou criar novos arquivos neste repositório, siga estritamente estas diretrizes:

### 1. Case-Sensitivity de Importações (Linux & Docker)
O sistema operacional de produção é **Linux**, que é sensível a maiúsculas e minúsculas.
* ⚠️ **SEMPRE** respeite a capitalização exata dos diretórios:
  * `../../Utils/random.js` (com **U** maiúsculo)
  * `../../Data/dataPiadas.js` (com **D** maiúsculo)
  * `./Handlers/commandHandler.js` (com **H** maiúsculo)
  * `./commands/...` (com **c** minúsculo)

### 2. Padrão de Criação de Slash Commands
Todo arquivo dentro de `commands/<Categoria>/<nome-do-comando>.js` deve exportar:
1. `data`: Instância de `SlashCommandBuilder`.
2. `execute(interaction, client)`: Função assíncrona com a lógica.

```javascript
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('exemplo')
    .setDescription('Descrição clara do comando.');

export async function execute(interaction, client) {
    // 1. Diga ao Discord imediatamente para evitar timeout de 3 segundos
    await interaction.deferReply();

    try {
        // Lógica do comando...
        const embed = new EmbedBuilder()
            .setColor('Green')
            .setDescription('Resultado do comando.');

        await interaction.editReply({ embeds: [embed] });
    } catch (error) {
        console.error(error);
        const errorMsg = { content: '❌ Ocorreu um erro ao executar este comando.', ephemeral: true };
        if (interaction.deferred || interaction.replied) {
            await interaction.editReply(errorMsg);
        } else {
            await interaction.reply(errorMsg);
        }
    }
}
```

### 3. Integração com Áudio (Kazagumo / Lavalink)
* Não use `@discordjs/voice` ou `distube`. Toda a reprodução é gerenciada via `client.manager` (Kazagumo).
* Para tocar músicas:
  ```javascript
  const player = await client.manager.createPlayer({
      guildId: interaction.guild.id,
      textId: interaction.channel.id,
      voiceId: interaction.member.voice.channel.id,
      deaf: true
  });
  const res = await client.manager.search(query, { requester: interaction.user });
  if (res.tracks.length) {
      player.queue.add(res.tracks[0]);
      if (!player.playing && !player.paused) player.play();
  }
  ```

### 4. Boas Práticas de Resposta no Discord
* **Timeout de Interações:** Comandos com processamento externo, requisições HTTP ou busca de mídia DEVEM chamar `await interaction.deferReply()` na primeira linha da função `execute`.
* **Tratamento de Erros:** Sempre valide `if (interaction.deferred || interaction.replied)` antes de responder em blocos `catch` para evitar erros `InteractionAlreadyReplied`.
