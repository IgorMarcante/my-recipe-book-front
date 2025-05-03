# Etapa 1: Build da aplicação Angular
FROM node:20-alpine AS builder

WORKDIR /app

# Copia os arquivos de configuração
COPY package*.json ./
COPY angular.json ./
COPY tsconfig*.json ./

# Instala dependências
RUN npm install

# Copia o código fonte
COPY src ./src

# Build para produção
RUN npm run build -- --configuration production

# Etapa 2: Servir com Caddy
FROM caddy:2-alpine

# Copia os arquivos estáticos do build
COPY --from=builder /app/dist/my-recipe-book /usr/share/caddy

# Configura o Caddyfile
COPY Caddyfile /etc/caddy/Caddyfile

# Expõe a porta
EXPOSE 80

# Inicia o Caddy
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]

