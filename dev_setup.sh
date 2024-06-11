#!/bin/bash

echo "Cleaning client..."
rm -rf shopping-list-app/client/node_modules
rm -rf shopping-list-app/client/build

echo "Cleaning server..."
rm -rf shopping-list-app/server/node_modules

echo "Copying .env file for development/QA..."
cp shopping-list-app/server/.env_dev shopping-list-app/server/.env

echo "Installing server dependencies..."
cd shopping-list-app/server
npm install
cd ../../

echo "Installing client dependencies..."
cd shopping-list-app/client
npm install
cd ../../

echo "Starting server..."
cd shopping-list-app/server
npm run start:dev &
cd ../../

echo "Starting client..."
cd shopping-list-app/client
npm run start:dev &
cd ../../

echo "All done!"
