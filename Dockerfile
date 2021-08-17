FROM node:14.8-alpine

ENV NODE_ENV=production
RUN mkdir /app
COPY yarn.lock /app
COPY package.json /app
WORKDIR /app

RUN NODE_ENV=development yarn install
COPY . /app
COPY ./docker-entrypoint.sh /docker-entrypoint.sh
CMD /docker-entrypoint.sh
