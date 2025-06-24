<div align="center">
	<h1 align="center">🐶Dogokit Corgi</h1>
  <p align="center">
    <span>React Router v7 Framework, tRPC, Prisma, Better Auth, Tailwind CSS, shadcn/ui</span>
    <br />
    <a href="https://corgi.dogokit.com">🚧 Live Demo</a>
  </p>
</div>

## Goal

[Dogokit Corgi](https://github.com/dogokit/dogokit-corgi) is the implementation details of [Dogokit Akita](https://github.com/dogokit/dogokit-akita). This template is optimized for the shortest time to production, but with long-term development as well.

### Tech Stack and Setup

- [x] TypeScript
- [x] Bun v1
- [x] Biome v2
  - [x] [Ultracite](https://ultracite.ai)
- [x] Vite v6
- [x] React v19
- [x] React Router v7 Framework (Remix)
  - [x] Themes: System, Light, Dark
  - [x] Integration with tRPC and Better Auth
  - [x] Vercel Config, can be removed if not needed
- [x] tRPC v11
- [x] Prisma ORM v6
- [x] Tailwind CSS v4
  - [x] `shadcn/ui` with single `radix-ui`
  - [ ] React Email
- [x] Zod v4 & Conform v1
- [x] Better Auth v1
- [x] Docker v28
- [x] PostgreSQL v17
- [ ] Vitest v3
- [ ] Playwright
- [ ] Storybook
- [ ] Turborepo

Optional:

- [x] VS Code: Settings and Extensions
- [ ] Cursor: Rules
- [ ] Resend or Amazon SES
- [ ] Uploadcare or Cloudflare R2
- [ ] Sentry
- [ ] Posthog
- [ ] Polar Payment
- [ ] Arcjet Security
- [ ] Unkey
- [ ] Fumadocs

## Get Started

### Setup Dependencies

Use [Bun](https://bun.sh) for dependency management and scripts. Ensure [Bun is installed](https://bun.sh/docs/installation):

```sh
curl -fsSL https://bun.sh/install | bash
```

Install dependencies:

```sh
bun install
```

### Code Quality

Check, format, lint to ensure the setup is fine:

```sh
bun check
```

If want to automatically format & lint the code:

```sh
bun write
```

### Environment Variables

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

### Database Setup

Prisma ORM is used to communicate with the database easily.

The default is PostgreSQL from local system, Docker container, or with services like Prisma Postgres, Neon, Supabase.

Start local database with Docker Compose:

```bash
bun db:up
```

Migrate database:

```sh
bun db:migrate
```

Seed initial data:

```sh
bun db:seed
```

Open Prisma Studio:

```sh
bun db:studio
```

Reset when needed:

```sh
bun db:reset
```

#### Build

Check if the production build is fine:

```sh
bun run build
```

Then run:

```sh
bun start
```

#### Deployment

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

#### Development

Develop the app while running the development server:

```sh
bun dev
```

Open <http://localhost:8000> and we're ready to develop.

## References

- [shadcn/ui](https://ui.shadcn.com)
- [OriginUI](https://originui.com)
- [Kibo UI](https://kibo-ui.com)
- [shadcn Registries](https://shadcn-registries.vercel.app)
- [registry.directory](https://registry.directory)
- [Better Auth: Demo](https://demo.better-auth.com)
- [`ayoubphy/react-router-trpc-prisma-better-auth`](https://github.com/ayoubphy/react-router-trpc-prisma-better-auth) is the original repo source

## Notes

### Credits

The codename ["Corgi" comes from a Welsh Corgi dog breed](https://britannica.com/animal/Welsh-Corgi) of affectionate small herding breed dog with short legs and a long body.

Originally created by [🧊Haidar](https://github.com/mhaidarhanif)

- [🐾Allnimal](https://allnimal.com)
- [🐻Bearmentor](https://bearmentor.com)
- [🐱Catamyst](https://catamyst.com)
- [🐶Dogokit](https://dogokit.allnimal.com)
- [🐘Elephanity](https://elevanty.allnimal.com)

### Tech Stack Comparison

What the tech stack choice replaces or each alternatives:

- TypeScript = Java, Go, Python, Ruby, PHP
- Bun = Node.js, Deno
- Biome = ESLint, Prettier
- React = Angular, Vue, Svelte
- React Router Framework = TanStack Router, Next.js, Nuxt
- tRPC = GraphQL, REST
- Prisma ORM = Drizzle, TypeORM, Sequelize, Mongoose
- Tailwind CSS = Bootstrap, MUI, Ant Design
- Zod = Joi, Yup
- Conform = TanStack Form, Formik, React Hook Form
- Better Auth = Passport.js, Auth0, Firebase Auth, Auth.js/NextAuth.js, Clerk
- Docker
- PostgreSQL = MySQL, SQLite, MongoDB, DynamoDB, Firestore
- Vite = Webpack, Parcel
- Vitest = Jest, Mocha, Jasmine
- Resend or Amazon SES = SendGrid, Mailgun, Postmark, SMTP
- Uploadcare or Cloudflare R2 = Amazon S3, Cloudinary, MinIO, Firebase Storage
- Polar Payment = Stripe, PayPal, Braintree
- Arcjet Security
