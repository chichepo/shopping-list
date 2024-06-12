#!/bin/bash
# File: shopping-list\shopping-list-app\client\prod_setup.sh

echo "Cleaning client..."
rm -rf shopping-list-app/client/node_modules
rm -rf shopping-list-app/client/build


echo "Installing client dependencies..."
cd shopping-list-app/client
npm install --production
export NODE_OPTIONS=--openssl-legacy-provider
npm run build
cd ../../


echo "Starting client..."
cd shopping-list-app/client
npm run start:prod