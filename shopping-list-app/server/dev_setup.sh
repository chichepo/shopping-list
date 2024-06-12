#!/bin/bash
# File: shopping-list\shopping-list-app\server\dev_setup.sh
echo "Cleaning server..."
rm -rf shopping-list-app/server/node_modules

echo "Copying .env file for development/QA..."
cp shopping-list-app/server/.env_dev shopping-list-app/server/.env

echo "Installing server dependencies..."
cd shopping-list-app/server
npm install
cd ../../

echo "Starting server..."
cd shopping-list-app/server
npm run start:dev