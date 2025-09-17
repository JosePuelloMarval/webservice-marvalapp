# ---------- Etapa 1: Construcción ----------
FROM node:18-alpine AS builder

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias primero
COPY package*.json tsconfig.json ./

# Instalar TODAS las dependencias (incluyendo dev para poder compilar)
RUN npm install

# Copiar todo el código fuente
COPY . .

# Compilar TypeScript a JavaScript
RUN npm run build


# ---------- Etapa 2: Producción ----------
FROM node:18-alpine AS production

WORKDIR /app

EXPOSE 5000

ENV PORT=5000

COPY package*.json .

RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

# Comando de inicio
CMD ["node", "dist/index.js"]
