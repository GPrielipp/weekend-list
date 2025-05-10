# Dockerfile
FROM php:8.2-apache
RUN docker-php-ext-install pdo pdo_mysql
COPY ./dev/ /www/var/html
USER www-data

EXPOSE 80