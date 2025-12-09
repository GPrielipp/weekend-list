FROM php:8.2-apache

# Install extensions to connect to MySQL
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Enable Apache mod_rewrite (useful for routing later)
RUN a2enmod rewrite