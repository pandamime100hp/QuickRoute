FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ENV TOMTOM_API_KEY=""

CMD ["npm", "test"]