FROM node:20.9.0-alpine3.17

RUN npm -g i pnpm
RUN mkdir /home/node/app

WORKDIR /home/node/app

COPY . .

RUN pnpm i

RUN pnpm build