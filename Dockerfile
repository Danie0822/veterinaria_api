# Usar una imagen oficial de Node.js como base
FROM node:18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de configuración de la aplicación
COPY package.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de la aplicación
COPY . .

# Asegurar que las variables de entorno sean accesibles dentro del contenedor
ARG API_PORT
ENV API_PORT=${API_PORT}

# Exponer el puerto definido
EXPOSE ${API_PORT}

# Solo correr migraciones y luego iniciar la app, sin ejecutar seeders
CMD ["sh", "-c", "npx sequelize db:migrate && npm run dev"]
