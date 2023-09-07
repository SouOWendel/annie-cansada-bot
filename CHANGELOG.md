# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 1.0.0 (2023-09-07)


### ⚠ BREAKING CHANGES

* Função para cooldown do bot sair do canal utilizando o event do DisTube chamado 'FINISH', após acabarem as músicas na queue.
* Adicionado o @distube/ytdl-core, cpu-stat, tweetnacl e yt-search.
* Adicionados os módulos e importações: Distube, StreamType, SpotifyPlugin, YtDlpPlugin.
* Mudança de versão e adição das dependencias: @distube/spotify, node-fetch, yt-search, ytdl-core.
* Readequação e refatoramento do código para melhor eficiência. Diversas alterações baseadas no desenvolvedor kajdev (youtube). No geral as funções agora são separadas em diversos arquivos de modo dinâmico, novos módulos foram adicionados diretamente do discord.js (partials) e instanciamento de variaveis do GatewayIntentBits e Partials.
* Realocação de arquivo e adaptações conforme as práticas de programação do kajdev (youtube).

### Features

* Adição da função de atividade (activity) do bot ao iniciar. ([9138412](https://github.com/SouOWendel/Annie-Cansada/commit/9138412ccd75c3e52582f6f7d3028493fbb2a5e5))
* Adição de código para configuração do help.js ([bfcb313](https://github.com/SouOWendel/Annie-Cansada/commit/bfcb313c65127a9a5eaeb65041ccfac7603bb0ef))
* Arquivo ainda em construção, apesar da existência do comando. ([8eef706](https://github.com/SouOWendel/Annie-Cansada/commit/8eef70625ea556e6fa9d04cd50beecf4956cb8fe))
* Arquivo de áudio e utilizado para tocar música. Atualmente funcionando bem, mas falta personalização. ([f0c6a74](https://github.com/SouOWendel/Annie-Cansada/commit/f0c6a740f41f7aec57f254a0272b9678cbc78a72))
* Código reescrito que faz com que a Annie responda a marcações. ([1935b92](https://github.com/SouOWendel/Annie-Cansada/commit/1935b92cb2f04c032c1c474c5631ab0fe268e4d8))
* Comandos foram segregados e alguns novos como nowplaying.js, loop.js, timeline.js, shuffle.js. ([a09d771](https://github.com/SouOWendel/Annie-Cansada/commit/a09d771a5eea8b2720a4abd8e249a7fc87061252))
* Criação da pasta Data e do arquivo com os dados das piadas do comando de piada (Commands/Fun/piada.js) ([08370e1](https://github.com/SouOWendel/Annie-Cansada/commit/08370e1fc1853a3aa648c82ac778ad2ef1ecc38c))
* Criação da pasta e do evento de interação que recepciona os novos membros de servidores atribuindo um cargo. ([1034f0e](https://github.com/SouOWendel/Annie-Cansada/commit/1034f0e129739525e8cbf46037efc4534f609dc3))
* Criação do comando piada.js que manda piadas aleatórias e atualmente conta com os tipo 'pergunta e respostas' ([4bddf28](https://github.com/SouOWendel/Annie-Cansada/commit/4bddf2867417c6af5c2791f37b41812785ecb108))
* Criação do comando que atualmente se chama dice-roll.js. Este comando chama 1d6 aleatório no chat. ([8d199c2](https://github.com/SouOWendel/Annie-Cansada/commit/8d199c2e3e9c08e8213f3d6ae99751ec824e3a42))
* Criada função getRandomNumber, a qual gera números aleatórios baseados em um parametro de limite. Alguns comentários foram adicionados. ([5cc1005](https://github.com/SouOWendel/Annie-Cansada/commit/5cc1005ee514a5507e5bdd85554310f0e8b58429))
* Criado arquivo de event PLAY_SONG. ([27d7f70](https://github.com/SouOWendel/Annie-Cansada/commit/27d7f7002e0152b680b7119f8e53cffd727feb43))
* Criado os comandos de botinfo e uptime, os quais mostram informações sobre o bot. ([ae426d5](https://github.com/SouOWendel/Annie-Cansada/commit/ae426d5adda71b5463406df4c00d940c60141735))
* Função de gerenciamento de comandos, algo que foi retirado do arquivo index.js e também reprogramado segundo as práticas de programação do kajdev (youtube). ([d26a201](https://github.com/SouOWendel/Annie-Cansada/commit/d26a201608a9ca8e8efa68a6b5e7364567ff47b5))
* Função de gerenciamento de eventos, algo que foi retirado do arquivo index.js e também reprogramado segundo as práticas de programação do kajdev (youtube). ([fa6a84c](https://github.com/SouOWendel/Annie-Cansada/commit/fa6a84c1e71ba2390a33a9cb0102f4c83ad5ba4c))
* Função para cooldown do bot sair do canal utilizando o event do DisTube chamado 'FINISH', após acabarem as músicas na queue. ([d518ec5](https://github.com/SouOWendel/Annie-Cansada/commit/d518ec5194c7e0a8f1c4557e0799f1ff67841c75))
* Funções retiradas do index.js e realocadas. ready.js manda uma mensagem quando o bot fica online. interactionCreate.js administra e faz uma ponte entre as interações por comando no discord e a programação do bot. ([0f15247](https://github.com/SouOWendel/Annie-Cansada/commit/0f1524715695909942e88dfa44c18112961778a8))
* Pasta de comandos Audio e join.js foram adicionados. Ngrok.exe foi removido. Pasta de exemplos foi removida. Game.js (pedra, papel ou tesoura) foi removido. Antigo arquivo de comandos (commands.js) foi removido. ([ddda7cc](https://github.com/SouOWendel/Annie-Cansada/commit/ddda7ccc265f6f478fd86331036ba63ff9b89ff8))
* Readequação e refatoramento do código para melhor eficiência. Diversas alterações baseadas no desenvolvedor kajdev (youtube). No geral as funções agora são separadas em diversos arquivos de modo dinâmico, novos módulos foram adicionados diretamente do discord.js (partials) e instanciamento de variaveis do GatewayIntentBits e Partials. ([b48c1bc](https://github.com/SouOWendel/Annie-Cansada/commit/b48c1bce6f9d47f2208227893597f8de47128496))
* Realocação de arquivo e adaptações conforme as práticas de programação do kajdev (youtube). ([6f568e6](https://github.com/SouOWendel/Annie-Cansada/commit/6f568e637464d3bce5a883272d5737922aef8e55))


### Bug Fixes

* Adequação e readequação dos comandos entrar e play  ao SlashCommandBuilder. ([c1e1c44](https://github.com/SouOWendel/Annie-Cansada/commit/c1e1c4477d2344c85b11d3025e4aa9ed04afcfb0))
* Agora realmente mostra o ping com um embed e o ws. ([dddbee6](https://github.com/SouOWendel/Annie-Cansada/commit/dddbee6db205cb6629179b786df985b27ecbeadc))
* Alguns erros de eslint foram corrigidos utilizando comentários. ([3779a4a](https://github.com/SouOWendel/Annie-Cansada/commit/3779a4ac759cca526f58c3ae4916f6f5ddc0e2b9))
* Código corrigido e que era o arquivo definition.js, agora funcionando bem. ([ab9df65](https://github.com/SouOWendel/Annie-Cansada/commit/ab9df655cebd95ced4dc050fd9a628f585b1d797))
* Correção da execução dos events, os quais são estavam tendo suas informações resgatadas adequadamente. ([9ef17e6](https://github.com/SouOWendel/Annie-Cansada/commit/9ef17e63a3852a44779f62f7020cd3169ec2d6c9))
* Corrigida a função de recepção de membros novos no servidor. ([dd77236](https://github.com/SouOWendel/Annie-Cansada/commit/dd77236b8e31d025de9f77c8854d0d23834389b6))
* Exclusão de códigos não mais utilizados. A função loadEvents() foi removida do client.login().then(). ([fc922ab](https://github.com/SouOWendel/Annie-Cansada/commit/fc922abb6d19a511e4c293f93a7c40d7a33fc92f))


### Performance Improvements

* Código de teste: função auxiliar que ajuda você a descobrir quais dependências você instalou com êxito. ([3e8a265](https://github.com/SouOWendel/Annie-Cansada/commit/3e8a26538a5e5358e0a1fbe29c833c323b22f789))
* Otimização de arquivo. Adequação ao SlashCommandBuilder e adaptação do código, além de referenciação correta. ([72b871b](https://github.com/SouOWendel/Annie-Cansada/commit/72b871be97c2c14d53c264ca671beaf23ea25f55))


### Build System

* Adicionado o @distube/ytdl-core, cpu-stat, tweetnacl e yt-search. ([4ce69b8](https://github.com/SouOWendel/Annie-Cansada/commit/4ce69b895e74e1b647d23a1af5e19b7b6291c6b1))
* Adicionados os módulos e importações: Distube, StreamType, SpotifyPlugin, YtDlpPlugin. ([9ac3758](https://github.com/SouOWendel/Annie-Cansada/commit/9ac37585dc61203b14f7b72a95171595ab2d7519))
* Mudança de versão e adição das dependencias: @distube/spotify, node-fetch, yt-search, ytdl-core. ([5456206](https://github.com/SouOWendel/Annie-Cansada/commit/5456206b44f00b05e46995a3b1c9c1259702f9ac))

## 2.2.0 (2023-08-30)
