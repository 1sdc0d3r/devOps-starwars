FROM ubuntu:latest
# FROM node:23.7.0

WORKDIR /app

COPY package*.json ./

# RUN npm install
RUN apt-get update && \
apt-get install -y curl gnupg && \
curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && \
apt-get install -y nodejs && \
npm config set update-notifier false
#npm install -g npm@latest #! not necessary

COPY . .

CMD [ "npm", "start" ]
