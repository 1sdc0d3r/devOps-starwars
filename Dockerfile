FROM ubuntu:latest

WORKDIR /app

COPY package*.json ./

# gnupg is needed to verify NodeSource script
RUN apt-get update && \
apt-get install -y curl gnupg && \
curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && \
apt-get install -y nodejs && \
npm config set update-notifier false

COPY . .

CMD [ "npm", "start" ]
