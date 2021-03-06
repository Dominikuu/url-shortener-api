FROM node:10.13.0

# Create app directory
RUN mkdir -p /usr/src/url-shortener-api
WORKDIR /usr/src/url-shortener-api

# Install app dependencies
COPY ./package.json /usr/src/url-shortener-api
RUN npm install

# Bundle app source
COPY . /usr/src/url-shortener-api

# Build arguments
ARG NODE_VERSION=10.13.0

# Environment
ENV NODE_VERSION $NODE_VERSION
