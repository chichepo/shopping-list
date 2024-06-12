#!/bin/bash
# File: shopping-list\shopping-list-app\server\prod_setup.sh

echo "Cleaning server..."
rm -rf shopping-list-app/server/node_modules

echo "Copying .env file for production..."
cp shopping-list-app/server/.env_prod shopping-list-app/server/.env

echo "Installing server dependencies..."
cd shopping-list-app/server
npm install --production
cd ../../

echo "Starting server..."
cd shopping-list-app/server
npm run start:prod