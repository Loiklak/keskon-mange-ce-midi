This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Installation
```bash
pnpm install
```

```bash
vercel env pull .env
```

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database

### Sync the DB

```bash
pnpm exec prisma db push
```
There is no migration atm to simplify development (there is only one db for prod and local dev)

### Open DB client

```bash
pnpm exec prisma studio
```
