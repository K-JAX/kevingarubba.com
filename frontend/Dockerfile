FROM node:14-alpine

RUN apk update && apk add bash && apk add curl

WORKDIR /home/node/app

COPY --chown=node:node package.json .

RUN chown -R node:node /home/node/app

RUN yarn install

COPY --chown=node:node ./ .

USER node