# Annie-Cansada

Devilline HQ Discord Bot

# Lista de Scripts do NPM Package

Ao longo do tempo a função dos scripts pode ser esquecida no tempo, seus nomes abreviados e códigos, que as vezes, são turvos, podem causar confusão, por isso, abaixo está uma lista das funções dos scripts. Eles podem ser utilizados com o prefixo "npm run (comando)".

## Node.JS

-   "start" faz a inicialização do bot através do arquivo index.js;
-   "restart" envia os "Slash Commands" para registro no Discord e então depois, inicializa o bot através do index.js;
-   "register" somente envia os "Slash Commands" para registro no Discord;
-   "dev" utiliza a dependência de desenvolvimento "nodemon" para monitorar alterações nos códigos e inicializar o bot através do index.js, após qualquer alteração salva no código, ele reinicializa;

## ESlint (dependência de desenvolvimento)

-   "lint" verifica os arquivos para tentar encontrar erros conforme as regras definidas para o lint;
-   "lint:fix" corrige todos os erros possíveis de serem corrigidos de forma automática.

## Husky (dependência de desenvolvimento)

### Regras de Pre-commit

Verificação: npm run lint;

### Regras de Pre-push
