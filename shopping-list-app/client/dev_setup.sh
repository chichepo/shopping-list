#!/bin/bash
# File: shopping-list\shopping-list-app\client\dev_setup.sh

echo "Cleaning client..."
rm -rf node_modules
rm -rf build

echo "Installing client dependencies..."
npm install

echo "Starting client..."
npm run start:dev
