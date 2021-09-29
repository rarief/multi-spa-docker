# app-three

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## How-to

### Nuxt

1. Add the following code into the `nuxt.config.js` file
    ```javascript
    router: {
      base: process.env.NODE_ENV === 'production' ? `/${process.env.npm_package_name}/` : '/'
    }
    ```

1. Create an `nginx.conf` file with the following code

    ```
    user  nginx;
    worker_processes  1;
    error_log  /var/log/nginx/error.log warn;
    pid        /var/run/nginx.pid;
    events {
      worker_connections  1024;
    }
    http {
      include       /etc/nginx/mime.types;
      default_type  application/octet-stream;
      log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                        '$status $body_bytes_sent "$http_referer" '
                        '"$http_user_agent" "$http_x_forwarded_for"';
      access_log  /var/log/nginx/access.log  main;
      sendfile        on;
      keepalive_timeout  65;
      server {
        listen       80;
        server_name  localhost;
        location / {
          root   /app;
          index  index.html;
          try_files $uri $uri/ /index.html;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
          root   /usr/share/nginx/html;
        }
      }
    }
    ```

1. Create a `Dockerfile` with the following code

    ```docker
    FROM node:latest as build-stage
    LABEL autodelete="true"
    WORKDIR /app
    COPY package*.json ./
    RUN npm install
    COPY ./ .
    RUN npm run generate

    FROM nginx as production-stage
    ARG MFE_APP_NAME
    RUN echo $MFE_APP_NAME
    RUN mkdir /app
    COPY --from=build-stage /app/dist /app/$MFE_APP_NAME
    COPY nginx.conf /etc/nginx/nginx.conf
    ```

1. Create a bash script for executing the docker image building process

    ```bash
    #!/bin/bash

    appname="$(node -e "console.log($(cat package.json)['name'])")"
    echo $appname
    imagename="mf-${appname}"
    docker build -q --build-arg MFE_APP_NAME=$appname -t ${imagename} .
    ```

1. Add the following script into your package.json

    ```javascript
      "scripts": {
        ...
        "build:docker": "bash ./scripts/build",
        ...
      },
    ```

## Installation

To build/rebuild all docker images at once, run the `./scripts/docker-build-all` script:

```bash
bash scripts/docker-build-all
```

It may take a couple of minutes to rebuild images for all the apps. If you want to build/rebuild the image for a specific app, you can do the following:

```bash
cd root
docker build -t mf-root .
```

```bash
cd app-one
docker build -t mf-app-one .
```

## Usage

Starting the docker swarm:

```bash
docker stack deploy --compose-file=docker-compose.yml test
```

Stopping the docker swarm:

```bash
docker stack rm test
```

Then you can open the app in this link:

```
http://localhost
```

App-one can be accessed like so:

```
http://localhost/app-one/
```

## License
[MIT](https://choosealicense.com/licenses/mit/)