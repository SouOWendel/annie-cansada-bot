# Usa imagem leve do Node.js LTS
FROM node:22-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia os manifestos de dependência
COPY package*.json ./

# Instala apenas dependências de produção ignorando scripts de desenvolvimento (como husky)
RUN npm install --omit=dev --ignore-scripts

# Copia todo o código da aplicação
COPY . .

# Comando para iniciar o bot
CMD ["node", "index.js"]
