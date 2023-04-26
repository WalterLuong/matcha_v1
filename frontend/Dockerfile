ARG NODE_IMAGE=node:16.13.1-alpine

FROM ${NODE_IMAGE} AS base
RUN mkdir -p /home/node/app && chown node:node /home/node/app
WORKDIR /home/node/app
USER node

FROM base AS dependencies

COPY --chown=node:node ./package*.json ./
RUN echo "BACKEND_URL=http://localhost:$BACKEND_PORT" > .env
RUN echo $FRONT_PORT >> .env
RUN echo $BACK_PORT >> .env
RUN yarn global add @vue/cli
RUN yarn install --no-cache
COPY --chown=node:node . .

CMD ["yarn", "dev"]