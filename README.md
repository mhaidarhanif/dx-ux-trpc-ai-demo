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

### Tech Stack

- [x] TypeScript
- [x] Bun v1
- [x] Biome v2
- [x] Vite v6
- [x] React v19
- [x] React Router v7 Framework (Remix)
  - [x] Themes
  - [x] Integration with tRPC and Better Auth
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
- [ ] Resend or Amazon SES
- [ ] Uploadcare or Cloudflare R2
- [ ] Polar Payment
- [ ] Arcjet Security

## Getting Started

### Environment Variables

Crucially, replace "BetterAuth Secret" with a strong, randomly generated secret. Use openssl or the secret generator in the BetterAuth documentation to create a secure secret. Do not use the placeholder value in a production environment!

To use Google as a social provider, you need to get your Google credentials. You can get them by creating a new project in the Google Cloud Console.
In the Google Cloud Console > Credentials > Authorized redirect URIs, make sure to set the redirect URL to http://localhost:5173/api/auth/callback/google for local development. For production, make sure to set the redirect URL as your application domain, e.g. https://example.com/api/auth/callback/google. If you change the base path of the auth routes, you should update the redirect URL accordingly.

This repo is using Neon Postgres as our database. make sure to replace the placeholder connection string with your actual Neon Postgres connection string.

### Setup Environment Variables and Compose

Copy from `.env.example` to `.env` and fill in the required values:

```bash
cp -n .env.example .env
```

Also make sure to reconfigure the default `docker-compose.yml` port for PostgreSQL.

### Installation

Install the dependencies:

```bash
bun install
```

### Start Database

```bash
bun db:up
# docker compose up -d
```

### Database Migration

Migrate the database:

```bash
bun db:migrate
# prisma db migrate dev
```

### Development

Start the development server:

```bash
bun dev
# react-router dev
```

Application is available at `http://localhost:5173`.

## Building for Production

Create a production build, that will also migrate deploy and generate Prisma client:

```bash
bun run build
# bun db:migrate:deploy && bun db:gen:prod && react-router build
```

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
- [🐘Elephanity](https://elephanity.allnimal.com)

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
