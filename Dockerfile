FROM node:12

WORKDIR /urlShortener

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
