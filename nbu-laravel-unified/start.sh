#!/bin/sh

# Check if the existing APP_KEY is a valid base64 Laravel key
# A valid key starts with 'base64:' or is exactly 32 chars for AES-256-CBC
case "$APP_KEY" in
    base64:*) ;;
    *) 
        if [ ${#APP_KEY} -ne 32 ]; then
            echo "Invalid APP_KEY detected. Unsetting to allow generation."
            unset APP_KEY
        fi
        ;;
esac

# Ensure .env exists
if [ ! -f .env ]; then
    cp .env.example .env
fi

# If APP_KEY is still missing, generate it
if [ -z "$APP_KEY" ]; then
    echo "Generating new APP_KEY..."
    php artisan key:generate --force --no-ansi
    # Export it for the current session
    export APP_KEY=$(grep APP_KEY .env | cut -d '=' -f2)
fi

echo "Running migrations..."
php artisan migrate --force

echo "Seeding database..."
php artisan db:seed --force

echo "Starting Apache..."
exec apache2-foreground
