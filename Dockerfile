# ---- Node modules ---- #
FROM node:18.12.1-alpine AS node_modules

COPY package*.json yarn.lock ./
RUN yarn install


# ---- Build ---- #
FROM node:18.12.1-alpine AS dist

COPY --from=node_modules node_modules ./node_modules
COPY . ./
RUN yarn build


# ---- Release ---- #
FROM node:18.12.1-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY --from=dist dist /usr/src/app/dist
COPY --from=node_modules node_modules /usr/src/app/node_modules
COPY . /usr/src/app

EXPOSE 8080
CMD [ "yarn", "start" ]