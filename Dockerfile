# Etapa 1: Construcción con Node y TypeScript
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json tsconfig.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Compilar TypeScript a JavaScript (salida en dist/)
RUN npm run build

# Etapa 2: Imagen de Producción
FROM node:18-alpine

WORKDIR /app

# Copiar solo lo necesario desde la etapa builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Instalar solo dependencias de producción
RUN npm install --only=production

# Exponer el puerto de la app (ajusta si es diferente)
EXPOSE 3000

# Comando de inicio
CMD ["node", "dist/index.js"]
