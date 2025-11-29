# backend/Dockerfile
FROM php:8.2-fpm AS base

# Dependencias de sistema
RUN apt-get update && apt-get install -y \
    git \
    curl \
    unzip \
    libpq-dev \
    libzip-dev \
    libicu-dev \
    libonig-dev \
    libxml2-dev \
    && docker-php-ext-install \
       pdo_pgsql \
       pgsql \
       mbstring \
       intl \
       zip \
       bcmath \
    && rm -rf /var/lib/apt/lists/*

# Opcional: opcache (útil en prod)
RUN docker-php-ext-install opcache

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

########################
# Etapa DEV
########################
FROM base AS dev

# Xdebug solo en desarrollo
RUN pecl install xdebug && docker-php-ext-enable xdebug

# Configs de PHP para dev
# (Crea estos archivos en backend/docker/php)
COPY docker/php/php.dev.ini /usr/local/etc/php/php.ini
COPY docker/php/xdebug.ini   /usr/local/etc/php/conf.d/xdebug.ini

# No copiamos el código aquí, porque lo montaremos como volumen
CMD ["php-fpm"]

########################
# Etapa PROD
########################
FROM base AS prod

# Configs de PHP para prod
COPY docker/php/php.prod.ini /usr/local/etc/php/php.ini

# Copiamos el código de Laravel
COPY . /var/www

# Instalamos dependencias para prod
RUN composer install --no-dev --optimize-autoloader

# Opcional: si quieres y tienes .env listo, puedes cachear (si da error, lo quitas)
# RUN php artisan config:cache \
#     && php artisan route:cache \
#     && php artisan view:cache

CMD ["php-fpm"]
