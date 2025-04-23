# Utilizar una imagen base de Node.js con soporte para LTS (Long Term Support)
FROM node:20-slim

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de dependencias primero para aprovechar la caché de Docker
COPY package*.json tsconfig.json ./

# Instalar las dependencias
RUN npm install

# **Instalar @nestjs/cli globalmente**
RUN npm install -g @nestjs/cli

# Copiar el resto de los archivos de la aplicación
COPY . .

# Generar la build de la aplicación NestJS
RUN npm run build

# Exponer el puerto en el que tu aplicación NestJS escucha (por defecto es 3000)
EXPOSE 3000

# Definir el comando para ejecutar la aplicación
CMD ["node", "dist/main"]
