# Multi SPA with Docker

An example of running multiple SPAs under the same domain using Docker containers and Traefik as reverse proxy.

## But why?

![But why?](docs/img/ryan-reynolds-but-why.gif?raw=true "But why?")

This project was part of an experiment to breakdown a "monolith" SPA app. The effort to breakdown the monolith was made because of problems with the monolith SPA, namely deployment difficulties.



## Getting started

```bash
docker build -t app-one .
docker run -ti -p 8080:80 --rm app-one
docker-compose up -d
docker-compose down
docker stack deploy --compose-file=docker-compose.yml test
docker stack rm test
```