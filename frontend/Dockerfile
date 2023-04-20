ARG NODE_IMAGE=node:16.13.1-alpine

FROM ${NODE_IMAGE} AS base
RUN mkdir -p /home/node/app && chown node:node /home/node/app
WORKDIR /home/node/app
# USER node

FROM base AS dependencies
COPY --chown=node:node ./package*.json ./
RUN echo "BACKEND_URL" > .env
RUN yarn install
COPY --chown=node:node . .


CMD ["yarn", "dev"]