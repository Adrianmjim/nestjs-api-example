FROM node:16.15.0-alpine3.14

RUN mkdir /app && chown node:node /app

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./

RUN npm install --quiet

COPY --chown=node:node . .

RUN npm run build

CMD [ "npm", "run", "start:prod"]

USER node
