#!/bin/bash
# File: shopping-list\shopping-list-app\server\dev_setup.sh
echo "Cleaning server..."
rm -rf node_modules

echo "Copying .env file for development/QA..."
cp .env_dev .env

echo "Installing server dependencies..."
npm install

echo "Starting server..."
npm run start:dev