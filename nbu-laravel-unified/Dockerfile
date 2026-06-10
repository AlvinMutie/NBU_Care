FROM php:8.3-cli

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libsqlite3-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    && docker-php-ext-install pdo_sqlite zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /app

# Copy application files
COPY . .

# Install PHP dependencies
RUN composer install --no-interaction --no-dev --optimize-autoloader

# Ensure database directory exists and permissions are set
RUN mkdir -p database storage bootstrap/cache \
    && touch database/database.sqlite \
    && chown -R www-data:www-data storage bootstrap/cache database

# Expose the default port
EXPOSE 10000

# Run migrations and start the server
# We use the $PORT environment variable provided by Render
CMD php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=${PORT:-10000}
