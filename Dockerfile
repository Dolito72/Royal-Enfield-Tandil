# Usa la imagen oficial de Nginx como base
FROM nginx:alpine

# Copia los archivos de tu aplicación al directorio de Nginx
COPY . /usr/share/nginx/html

# Expone el puerto en el que Nginx escucha
EXPOSE 80
