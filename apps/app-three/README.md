# React app

## Installation

```bash
# install dependencies
yarn
```

### Run locally

You can run the app locally just like a regular SPA

```bash
yarn start
```

Another way of running the app is by building the docker image and to run the built image

```bash
# build the docker image
yarn build:docker

# replace `<app-name>` with the application name
# as defined in the `package.json` name property
docker run -ti -p <port>:80 --rm <app-name>

# for example
docker run -ti -p 8080:80 --rm app-react

# the project is accessible at `localhost:8080/app-react`
```

## Development

1. Set custom base URL by setting `homepage` in the `package.json` file

    ```json
    ...
    "name": "app-three",
    ...
    "homepage": "/app-three/",
    ...
    ```

1. Create a `Dockerfile`

    ```docker
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
    ```

1. Create a `.dockerignore` file with the following content

    ```docker
    # add git-ignore syntax here of things
    # you don't want copied into docker image

    .git
    *Dockerfile*
    *docker-compose*
    node_modules
    ```

1. Create an `nginx.conf` file

    ```conf
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
          root /usr/share/nginx/html;
          index  index.html;
          try_files $uri $uri/ /index.html;
        }
        error_page   500 502 503 504  /50x.html;
      }
    }
    ```

1. Create a bash script for executing the docker image building process

    ```bash
    #!/bin/bash

    appname="$(node -e "console.log($(cat package.json)['name'])")"
    echo -e "Building: ${GREEN}$appname${NC}"
    docker build -q --build-arg APP_NAME=$appname -t ${appname} .
    ```

1. Add the following script into your package.json

    ```json
      "scripts": {
        ...
        "build:docker": "bash ./scripts/build",
        ...
      },
    ```

## License

[MIT](https://choosealicense.com/licenses/mit/)
