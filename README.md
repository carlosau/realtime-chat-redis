## Build and Deploy a Chat Application That Scales Horizontally with WebSockets and Upstash Redis

## Upstash
Upstash is a serverless data platform that provides serverless Redis, kafka & QStash.

## Who is this video for?
1. Those who are already familiar with JavaScript/TypeScript

## Features
1. Send and receive messages
1. Show current connection count

## What will you learn?
1. Create realtime communications with WebSockets
1. Use Redis Pub/Sub to communicate across multiple instances
1. Use Redis to stop data (connection count/ messages)
1. Use Docker and docker-compose to containerize the application
1. Docker multi-stage builds
1. Use GitHub actions to automate CI/CD
1. Graceful shutdowns

## What are we using?
1. Fastify - Backend
1. Websockets - Realtime 
1. Next.js - Frontend
1. Tailwind & Shadcn UI - Styling
1. Redis - Pub/Sub
1. Docker/docker-compose - Containerization
1. GitHub actions - CI/CD
1. DigitalOcean - Host the backend
1. Vercel - Host the frontend

## What will you need?
1. [Upstash account](https://upstash.com/)
1. [Node.js](https://nodejs.org/en)
1. [Docker & docker-compose](https://docs.docker.com/engine/install/)
1. An editor - [VSCode](https://code.visualstudio.com/)
1. [DigitalOcean](https://www.digitalocean.com/) account
1. [Vercel](https://vercel.com/) account
1. [Vercel CLI](https://vercel.com/docs/cli)
1. [GitHub](https://github.com) account


## Video structure
1. Build backend
1. Dockerise backend
1. Deploy backend
    1. Create DigitalOcean droplet
    1. Configure droplet
    1. Write github action
1. Build frontend
1. Deploy frontend 

## Debugging
### Websockets
1. Make sure you are using `wss://` and not `ws://` in production
2. Use debug mode in Caddy server
```
{
    debug
}
```

### Docker
1. List our running docker containers
```bash
docker ps
```
1. Stop a running container
```bash
docker stop <container id>
```

1. Remove a container
```bash
docker rm <container id>
```

1. List out networks
```bash
docker network ls
```

1. Remove a network
```bash
docker network rm <network id>
```


## Server
### Create a new project
```bash
pnpm init
```

### Install dependencies
```bash
pnpm add fastify fastify-socket.io ioredis close-with-grace dotenv socket.io @fastify/cors
```

### Install dev dependencies
```bash
pnpm add @types/node tsx typescript @types/ws -D
```

### Create tsconfig.json
```bash
pnpm tsc --init
```
## UI
### Create Next.js app
```base
pnpm create next-app ui
```

### Install dependencies
```bash
pnpm add socket.io-client
```
### Install dev dependencies
```bash
pnpm add @types/ws -D
```

### Install shadcn-ui
```bash
npx shadcn-ui@latest init
```


### Add components
```bash
npx shadcn-ui@latest add textarea button form
```


## Deploy steps
### Create the server
1. Generate some keys https://www.wpoven.com/tools/create-ssh-key#
1. Create a DO droplet

### Configure the server
1. SSH intro droplet
1. Update the package repository metadata - sudo apt update
1. Add the NodeJS package - `curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -`
1. Install Node.js `sudo apt-get install nodejs`
1. Install docker compose - `sudo apt install docker-compose`
1. Install NodeJS (so we can build the UI) - `sudo apt install nodejs npm`
1. Install pnpm - `wget -qO- https://get.pnpm.io/install.sh | sh -`
1. `source /root/.bashrc`
1. If you're using a private repo get a GitHub PAT
1. Clone the repo - git clone `https://<PAT>@<repo>`

### Start deploying
1. Configure the GH action