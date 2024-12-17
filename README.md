# Velocity Core Docs

This project contains the documentation of Velocity Core by Etribes and at the same time showcases how to use the Velocity Core tooling. This also serves the webpage at velocity-core.etribes.de

## Stack and libraries

- TypeScript (https://typescriptlang.org)
- Node.js (https://nodejs.org)
- Fastify (https://fastify.io)
- JSX (https://react.dev/learn/writing-markup-with-jsx)
- Tailwind (https://tailwindcss.com)
- Turbo (https://turbo.hotwired.dev)
- Web Components (https://webcomponents.org)

## Prerequisites

- Node.js v20+ installed

## Getting started

### Install dependencies

```sh
npm install
```

### Create `.env` and configure as needed

```sh
cp example.env .env
```

### Run in dev mode

```sh
npm run dev
```

## Build for production

### Build

```sh
npm run build
```

### Run

```sh
npm start
```

## Run with Docker

### Build

```sh
docker build -t velocity-docs .
```

### Run

```sh
docker run --name velocity-docs -p 8888:8888 --env-file .env -e NODE_ENV=production velocity-docs
```
