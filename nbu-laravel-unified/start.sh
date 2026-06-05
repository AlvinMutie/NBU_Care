#!/bin/sh

# Ensure the app key is set (if not already in environment)
if [ -z "$APP_KEY" ]; then
    echo "Generating APP_KEY..."
    php artisan key:generate --show --no-ansi > /tmp/app_key
    export APP_KEY=$(cat /tmp/app_key)
fi

echo "Running migrations..."
php artisan migrate --force

echo "Starting Apache..."
exec apache2-foreground
