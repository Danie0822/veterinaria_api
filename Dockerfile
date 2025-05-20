# Imagen base optimizada
FROM node:18-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Instalar dependencias (usando solo package.json para cache eficiente)
COPY package.json package-lock.json* ./
RUN npm install --frozen-lockfile

# Copiar el resto del código
COPY . .

# Variables de entorno
ARG API_PORT
ENV API_PORT=${API_PORT}

# Exponer puerto
EXPOSE ${API_PORT}

# Ejecutar migraciones y lanzar app
CMD ["sh", "-c", "npx sequelize db:migrate && npm run dev"]
