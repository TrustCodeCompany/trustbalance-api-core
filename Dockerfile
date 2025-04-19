# Utilizar una imagen base de Node.js con soporte para LTS (Long Term Support)
FROM node:20-alpine AS base

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de dependencias primero para aprovechar la caché de Docker
COPY package*.json ./

# Instalar las dependencias
RUN npm install --omit=dev

# Copiar el resto de los archivos de la aplicación
COPY . .

# Generar la build de la aplicación NestJS
RUN npm run build

# --- Imagen para la ejecución (más ligera) ---
FROM node:20-alpine AS runner

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar solo los módulos de node y la build generada
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/dist ./dist

# Exponer el puerto en el que tu aplicación NestJS escucha (por defecto es 3000)
EXPOSE 3000

# Definir el comando para ejecutar la aplicación
CMD ["node", "dist/main"]
