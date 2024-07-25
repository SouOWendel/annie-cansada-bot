# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.1.1](https://github.com/SouOWendel/annie-cansada-bot/compare/v2.1.0...v2.1.1) (2023-09-16)


### Bug Fixes

* corrigido o caminho de vários arquivos por conta da mudança do nome da pasta ([de350c4](https://github.com/SouOWendel/annie-cansada-bot/commit/de350c44e24917846102fdbbf6b0df1029c27201))

## [2.1.0](https://github.com/SouOWendel/annie-cansada-bot/compare/v2.0.1...v2.1.0) (2023-09-16)


### Features

* adaptação para os novo método de request e leitura dos cookies do YouTube ([3a1b7c1](https://github.com/SouOWendel/annie-cansada-bot/commit/3a1b7c1ff94e394eacaee9282077b9ac8b3e1281))
* arquivo com os cookies do YouTube ([edebe3e](https://github.com/SouOWendel/annie-cansada-bot/commit/edebe3e30c0a50fcc7b14447f567add1aa2815e0))
* **npm:** exclusão de algumas dependências e atualização do ytdl-core ([cc3b863](https://github.com/SouOWendel/annie-cansada-bot/commit/cc3b863a3d9cc9b09bc5b8b4b3fa8c0f7ff74f63))
* **release-please:** troquei o input runs-on de Windows para Ubuntu ([5d5fffe](https://github.com/SouOWendel/annie-cansada-bot/commit/5d5fffed75b8c4470849db365380176c7b9940a3))

## [2.0.1](https://github.com/SouOWendel/Annie-Cansada/compare/v2.0.0...v2.0.1) (2023-09-08)


### Bug Fixes

* **changelog:** correção da versão inicial do changelog ([4d0fb1f](https://github.com/SouOWendel/Annie-Cansada/commit/4d0fb1f1fc50df8434077c4f36c17c944765fc04))
* commit de teste ([c72c563](https://github.com/SouOWendel/Annie-Cansada/commit/c72c5637d3256c803727cd42d9c29e472ace7244))

## [2.0.0](https://github.com/SouOWendel/Annie-Cansada/compare/v1.0.0...v2.0.0) (2023-09-08)

### ⚠ BREAKING CHANGES

-   Sem algumas das dependências listadas, como ffmpeg, prism o áudio muito provavelmente irá parar de funcionar
-   **commands:** A descentralização do comando de música poderia quebrar a compatibilidade de comandos, padrões reconhecidos de uso, etc

### Features

-   **commands:** adição de uma função que manda uma mensagem no chat privado da pessoa que interagir ([698e2d2](https://github.com/SouOWendel/Annie-Cansada/commit/698e2d29cd87bf59492cafa52d57026eeef0b8dc))
-   **commands:** comando para gravar a voz em uma chamada de voz no Discord, mas ainda não terminado ([2e42088](https://github.com/SouOWendel/Annie-Cansada/commit/2e42088a01c5a6c97b2519fd45bdfb00c1564669))
-   **commands:** comando para tocar músicas vinda de arquivos do computador ([3ccbd8e](https://github.com/SouOWendel/Annie-Cansada/commit/3ccbd8e4efa08f4c883e75fbda3dfa4d3aed3361))
-   **commands:** criação do comando de saida do canal de voz ([1d66418](https://github.com/SouOWendel/Annie-Cansada/commit/1d66418858906445249974686c2665a35642d5be))
-   **commands:** personalização da interação e implementação do sistema de curiosidades aleatorias ([b3079ec](https://github.com/SouOWendel/Annie-Cansada/commit/b3079ecf470349bbb233aa576dbd6e73c05d100f))
-   criação do arquivo de embeds e adição de um embed para erros gerais ([4de9abb](https://github.com/SouOWendel/Annie-Cansada/commit/4de9abbbe322f9421e7c527bf0250749ba149561))
-   **events:** adição de mensagens após uma música acabar ([6aba567](https://github.com/SouOWendel/Annie-Cansada/commit/6aba567a988df4f41778d8a390bb1a222a341aed))
-   **events:** definição inicial para os servidores que o bot entrar ([49626cb](https://github.com/SouOWendel/Annie-Cansada/commit/49626cbc55041246de083f4b21c4ddcb4c0e8ed6))
-   **events:** evento de início de queue em sua configuração inicial (sem grandes alterações) ([c29a3e2](https://github.com/SouOWendel/Annie-Cansada/commit/c29a3e2e786bac621876b734e861ca56a25cd98c))
-   **handler:** tratamento de erros e aplicação inicial do MAGI ANTI CRASH SYSTEM ([ff142c0](https://github.com/SouOWendel/Annie-Cansada/commit/ff142c02016db141c44e549410a86456bf409cb8))
-   leaveOnStop false, nsfw true, mudança do cookie do YouTube, collection e errorHandler ([5b52531](https://github.com/SouOWendel/Annie-Cansada/commit/5b5253127e9488afde875e60c15cdb9ef844bb5d))
-   **utils:** adição da feature de fatos aleatórios ([3efc6ca](https://github.com/SouOWendel/Annie-Cansada/commit/3efc6caad236ab6ed59c6331c2effebd7bf8976c))

### Bug Fixes

-   **events:** correção da função que envia uma mensagem de boas vindas aos novos usuários do servidor ([12a34bf](https://github.com/SouOWendel/Annie-Cansada/commit/12a34bf5a8bb1eb63d8fb586589cb99530048a35))
-   **events:** correção da função que retira o bot do canal de voz quando estiver ocioso ([55d8c11](https://github.com/SouOWendel/Annie-Cansada/commit/55d8c11a283ffbcae7d4a0207e3ec77e79991fbe))

### Performance Improvements

-   **events:** adição de console.time para medição do tempo de resposta de comandos do interaction ([f58dd01](https://github.com/SouOWendel/Annie-Cansada/commit/f58dd019c37c6cc327c5f1103e7e5ca8c00ac44a))

### Build System

-   **commands:** comando descontinuado e excluido ([0571d5b](https://github.com/SouOWendel/Annie-Cansada/commit/0571d5ba0662d23be35afce06c3982de32a1e492))
-   dependências adicionadas: commitlint, eslint, commitizen, ffmpeg, prism, husky, epicgames ([bd79bd1](https://github.com/SouOWendel/Annie-Cansada/commit/bd79bd1d3b076188802ee45ffcb2fd6e134c4428))

## 1.0.0 (2023-08-30)
