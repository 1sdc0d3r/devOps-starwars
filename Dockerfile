# FROM ubuntu:latest
FROM node:23.7.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]
