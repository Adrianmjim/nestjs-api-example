FROM node:16.4.0-alpine3.10

RUN mkdir /app && chown node:node /app

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./

RUN npm install --quiet

COPY --chown=node:node . .

RUN npm run build

CMD [ "npm", "run", "start:prod"]

USER node
