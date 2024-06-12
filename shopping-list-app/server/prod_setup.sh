#!/bin/bash
# File: shopping-list\shopping-list-app\server\prod_setup.sh

echo "Cleaning server..."
rm -rf node_modules

echo "Copying .env file for production..."
cp .env_prod .env

echo "Installing server dependencies..."
npm install --production

echo "Starting server..."
npm run start:prod