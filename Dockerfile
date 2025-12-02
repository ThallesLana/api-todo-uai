# BUILD
FROM node:22-alpine AS builder

WORKDIR /app

# Instalar dependências primeiro (melhor cache)
COPY package*.json ./
RUN npm ci --frozen-lockfile

# Copiar código e buildar
COPY . .
RUN npm run build

# DEPLOY
FROM node:22-alpine

# Criar usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs && \
    adduser -S todo_uai_user -u 1001

WORKDIR /app

# Copiar package.json e instalar apenas dependências de produção
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev --frozen-lockfile && npm cache clean --force

# Copiar build e ajustar permissões
COPY --from=builder --chown=todo_uai_user:nodejs /app/dist ./dist
COPY --from=builder --chown=todo_uai_user:nodejs /app/swagger.json ./swagger.json

# Configurar variáveis de ambiente
ENV NODE_ENV=production

# Expor porta (será definida via docker-compose)
EXPOSE $PORT

# Mudar para usuário não-root
USER todo_uai_user

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:' + (process.env.PORT || 3000) + '/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" || exit 1

# Comando de inicialização
CMD ["node", "dist/server.js"]