FROM node:10.13.0-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn --production --no-progress --frozen-lockfile install \
  && yarn cache clean

ADD . /app/

EXPOSE 3000

CMD [ "node", "./index.js"]