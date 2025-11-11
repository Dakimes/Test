# TechOnePager Monorepo

TechOnePager generates research-backed technology one pagers from uploaded assets, URLs, and text snippets. The monorepo bundles a Next.js 14 web app and a BullMQ queue worker.

## Structure

```
apps/web       # Next.js fullstack application
packages/queue # Queue worker for BullMQ
infra          # Docker compose stack and Makefile helpers
storage        # Local storage driver mount point
```

## Getting Started

1. Copy environment variables:

```bash
cp infra/.env.example .env
```

2. Install dependencies and generate Prisma client:

```bash
npm install
npm run -w apps/web prisma:migrate
npm run -w apps/web prisma:seed
```

3. Run the development server:

```bash
npm run -w apps/web dev
```

4. Access the app at http://localhost:3000.

## Docker

The stack runs entirely via Docker:

```bash
make -f infra/Makefile up
```

Services include Postgres, Redis, MailHog, MinIO, the Next.js web app, and the BullMQ worker.

## Testing

Unit tests use Vitest and e2e tests use Playwright:

```bash
npm run -w apps/web test
npm run -w apps/web test:e2e
```

## Logging

Server logs use Pino with minimal metadata and no personal information.

## Queue Worker

The queue worker in `packages/queue` consumes jobs to orchestrate one pager generation via the Next.js internal API.

## Storage

Uploaded files are stored under the `storage/` directory by default. Switch to MinIO by updating `STORAGE_DRIVER` and credentials in `.env`.

```
docker compose up
# затем открой http://localhost:3000
```
