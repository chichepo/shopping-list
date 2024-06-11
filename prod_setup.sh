#!/bin/bash

echo "Cleaning client..."
rm -rf shopping-list-app/client/node_modules
rm -rf shopping-list-app/client/build

echo "Cleaning server..."
rm -rf shopping-list-app/server/node_modules

echo "Copying .env file for production..."
cp shopping-list-app/server/.env_prod shopping-list-app/server/.env

echo "Installing server dependencies..."
cd shopping-list-app/server
npm install --production
cd ../../

echo "Installing client dependencies..."
cd shopping-list-app/client
npm install --production
export NODE_OPTIONS=--openssl-legacy-provider
npm run build
cd ../../

echo "Starting server..."
cd shopping-list-app/server
npm run start:prod &
cd ../../

echo "Starting client..."
cd shopping-list-app/client
npm run start:prod &
cd ../../

echo "All done!"
