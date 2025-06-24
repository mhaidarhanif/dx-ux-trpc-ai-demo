# Get Started

## Setup Dependencies

Use [Bun](https://bun.sh) for dependency management and scripts. Ensure [Bun is installed](https://bun.sh/docs/installation):

```sh
curl -fsSL https://bun.sh/install | bash
```

Install dependencies:

```sh
bun install
```

## Code Quality

Check, format, lint to ensure the setup is fine:

```sh
bun check
```

If want to automatically format & lint the code:

```sh
bun write
```

## Environment Variables

Create the `.env` file from `.env.example`. This is only for local development, not production:

```sh
cp -i .env.example .env
```

Configure the required environment variables if on local, otherwise in the project settings on other environments.

If necessary, create the `.env.prod` for production info. Adjust accordingly if needed for `staging`, `test`, etc. Be careful to change the `URL` variables on different domains and subdomains.

```sh
cp -i .env.example .env.prod
```

Required:

- `VITE_APP_URL`
- `BETTER_AUTH_SECRET`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_DB`
- `DATABASE_URL`

Optional:

- `*_CLIENT_ID` and `*_CLIENT_SECRET`: For OAuth related, [check Guide: OAuth](./docs/GUIDE_OAUTH.md)
- `*_ACCESS_TOKEN` and `*_WEBHOOK_SECRET` for payment related.

## Database Setup

Prisma ORM is used to communicate with the database easily.

The default is PostgreSQL from local system, Docker container, or with services like Prisma Postgres, Neon, Supabase.

Migrate the database:

```sh
bun db:migrate
```

Then seed the initial data anytime when needed:

```sh
bun db:seed
```

Open Prisma Studio to view the data:

```sh
bun db:studio
```

### Build

Check if the production build is fine:

```sh
bun run build
```

Then run:

```sh
bun start
```

### Deployment

Pick a host to deploy it to, such as:

- Vercel
- Netlify
- Render.com
- Railway.com
- Fly.io
- Google Cloud
- Amazon Web Services
- Microsoft Azure
- VPS with Coolify, Dokploy, etc

### Development

Develop the app while running the development server:

```sh
bun dev
```

Open <http://localhost:8000> and we're ready to develop.
