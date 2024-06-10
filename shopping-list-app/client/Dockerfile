# Use the official Node.js image as the base image.
FROM node:14

# Set the working directory in the container.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application code.
COPY . .

# Build the React application.
RUN npm run build

# Install 'serve' to serve the built application.
RUN npm install -g serve

# Expose the port the app runs on.
EXPOSE 3000

# Start the app using 'serve'.
CMD ["serve", "-s", "build"]
