#!/bin/bash
# File: shopping-list\shopping-list-app\client\prod_setup.sh

echo "Cleaning client..."
rm -rf node_modules
rm -rf build


echo "Installing client dependencies..."
npm install --production
export NODE_OPTIONS=--openssl-legacy-provider
npm run build

echo "Starting client..."
npm run start:prod