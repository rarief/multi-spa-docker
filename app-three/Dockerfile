# docker build -q --build-arg APP_NAME=app-three -t app-three .

FROM node:latest as build-stage
LABEL autodelete="true"
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY ./ .
RUN yarn build

FROM nginx as production-stage
ARG APP_NAME
RUN echo $APP_NAME
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-stage /app/build /usr/share/nginx/html/$APP_NAME
COPY nginx.conf /etc/nginx/nginx.conf