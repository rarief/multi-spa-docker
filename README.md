# Multi SPAs with Docker

This project is an example of running multiple SPAs under the same domain by using Docker and Traefik.

## But why?

![But why?](docs/img/ryan-reynolds-but-why.gif?raw=true "But why?")

> TLDR; This project was part of an experiment to breakdown a "monolith" SPA app into multiple smaller SPAs to achieve independent deployments for different parts of the app.

### Context

Imagine that we develop an SPA website to be used internally by different departments within an enterprise. At first, probably it would be a simple web app consisting of less than ten pages serving just two departments. Any requirements would come through and eventually be reviewed by these departments.

However, as the applications grow, more pages and more departments are involved, and inevitably at some point the deployment process becomes every difficult. For example:

- Every deployment would be relatively big where multiple features (and multiple departments) are involved
- As the deployments become bigger, the frequency would be less rapid as each deployment would take longer to process

### Solution

To solve this issue, what we can do is to 'split' the monolith app into several smaller apps. The goal is to have multiple deployment pipeline which enable independent deployments, meaning that we can deploy a small part of our application without affecting (or being affected by) the rest of the apps.

In this example, all the apps within the `./apps` can be either moved to separate repo or hosted within a monorepo.

### Is this a micro-frontends?

Yes, and no:

- No, this is not an implementation where you can have multiple apps on the same page (for example, a navigation menu made of React and a sidebar menu made of Vue).
- But also, yes. Arguably, there are [several implementation types of micro-frontends](https://www.angulararchitects.io/aktuelles/a-software-architects-approach-towards/). This project implements the simplest micro-frontends implementation where the apps are integrated using simple hyperlinks.

## Installation

Node.js, Docker, and docker-compose are prerequisite.

### Build the docker images

```bash
# build all the Docker images (for Linux and MacOS)
bash ./scripts/docker-build-all

# build the Docker image individually
cd ./apps/<app>
yarn build:docker
```

### Run the docker compose

```bash
# starting the apps
docker-compose up -d

# stopping the apps
docker-compose down
```

## Development

To understand how each app are made, read the `README.md` of each app within the `./apps/` directory.

- Root app: [README](apps/app-root/README.md)
- Vue app: [README](apps/app-one/README.md)
- Nuxt app: [README](apps/app-two/README.md)
- React app: [README](apps/app-three/README.md)

## License
[MIT](https://choosealicense.com/licenses/mit/)
