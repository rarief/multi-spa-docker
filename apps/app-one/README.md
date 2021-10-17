# App Vue

## Installation

```bash
yarn
```

## Usage

### Run locally

```bash
yarn serve
```

### Build docker image

```bash
yarn build:docker
```

The docker image can be run using the following command:

```bash
# replace <port> and <app-name>
docker run -ti -p <port>:80 --rm <app-name>

# for example
docker run -ti -p 8080:80 --rm app-vue
```

It is important to set the `application-name` the same with the application name defined in the `package.json` file. After running the command, the project is accessible at `localhost:8080/app-vue`.

## Explanation

### Configuration Steps

1. Create a `vue.config.js` file and add the following code

    ```javascript
    module.exports = {
      publicPath: process.env.NODE_ENV === 'production' ? `/${process.env.npm_package_name}/` : '/'
    }
    ```

1. Create an `nginx.conf` file with the following code

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

1. Create a `Dockerfile` with the following code

    ```docker
    FROM node:latest as build-stage
    LABEL autodelete="true"
    WORKDIR /app
    COPY package*.json ./
    RUN npm install
    COPY ./ .
    RUN npm run build

    FROM nginx as production-stage
    ARG APP_NAME
    RUN echo $APP_NAME
    RUN rm -rf /usr/share/nginx/html/*
    COPY --from=build-stage /app/dist /usr/share/nginx/html/$APP_NAME
    COPY nginx.conf /etc/nginx/nginx.conf
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