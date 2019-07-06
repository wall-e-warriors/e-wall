FROM node:8.16-alpine
MAINTAINER WallE <ewall@walle.com>

COPY . /usr/src/app
WORKDIR /usr/src/app

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]

