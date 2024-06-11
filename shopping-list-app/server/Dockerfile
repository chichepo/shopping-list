# shopping-list-app/server/Dockerfile

FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --production
COPY . .

EXPOSE 5000

CMD ["npm", "run", "start:prod"]
