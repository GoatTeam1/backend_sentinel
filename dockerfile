FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /app

# Copiar package.json y lock
COPY package.json pnpm-lock.yaml ./

# 🔥 Copiar solo la carpeta prisma ANTES de instalar dependencias
COPY prisma ./prisma

# Instalar dependencias (ya puede ejecutar prisma generate)
RUN pnpm install

# Copiar todo lo demás
COPY . .

# Compilar TS
RUN pnpm build

EXPOSE 3000

CMD ["node", "dist/index.js"]
