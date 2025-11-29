# frontend/Dockerfile

########################
# Etapa DEV (Vite dev server)
########################
FROM node:20-alpine AS dev

WORKDIR /app

# Copiamos solo los archivos de dependencias
COPY package*.json ./
RUN npm install

# Copiamos el resto del código del frontend
COPY . .

# Vite dev server, accesible desde el host
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]

########################
# Etapa BUILD (compilar React)
########################
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

########################
# Etapa PROD (Nginx sirviendo React estático)
########################
FROM nginx:1.27-alpine AS prod

# Copiamos el build de React generado en la etapa build
COPY --from=build /app/dist /usr/share/nginx/html

# Config de Nginx para el frontend (SPA)
# Ruta en el host: frontend/docker/nginx/nginx.frontend.conf
COPY docker/nginx/nginx.frontend.conf /etc/nginx/conf.d/default.conf