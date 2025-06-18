<div align="center">
	<h1 align="center">🐶Dogokit Corgi</h1>
  <p align="center">
    <span>React Router v7 Framework, tRPC, Prisma, Better Auth, Tailwind CSS, shadcn/ui</span>
    <br />
    <a href="https://corgi.dogokit.com">🚧 Live Demo</a>
  </p>
</div>

## Goal

[Dogokit Corgi](https://github.com/dogokit/dogokit-corgi) is the implementation details of [Dogokit Akita](https://github.com/dogokit/dogokit-akita), using:

- [x] React v19
- [x] React Router v7 Framework
  - [x] Themes
- [x] tRPC v11
- [x] Prisma v6
- [x] Tailwind CSS v4
  - [x] `shadcn/ui` with single `radix-ui`
  - [x] React Email
- [x] Zod v4 & Conform v1
- [x] Better Auth v1
- [x] Docker v28
- [x] PostgreSQL v17
- [x] Biome v2
- [x] Vite v6
- [ ] Vitest v3
- [ ] Resend
- [ ] Uploadcare or Cloudflare R2
- [ ] Polar
- [ ] Arcjet

## Getting Started

### Environment Variables

Crucially, replace "BetterAuth Secret" with a strong, randomly generated secret. Use openssl or the secret generator in the BetterAuth documentation to create a secure secret. Do not use the placeholder value in a production environment!

To use Google as a social provider, you need to get your Google credentials. You can get them by creating a new project in the Google Cloud Console.
In the Google Cloud Console > Credentials > Authorized redirect URIs, make sure to set the redirect URL to http://localhost:5173/api/auth/callback/google for local development. For production, make sure to set the redirect URL as your application domain, e.g. https://example.com/api/auth/callback/google. If you change the base path of the auth routes, you should update the redirect URL accordingly.

This repo is using Neon Postgres as our database. make sure to replace the placeholder connection string with your actual Neon Postgres connection string.

### Installation

Install the dependencies:

```bash
bun install
```

### Database Migration

Migrate the database:

```bash
bun prisma db migrate dev
```

### Development

Start the development server:

```bash
bun dev
```

Application is available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
bun run build
```

## Components

Get more:

- [shadcn/ui](https://ui.shadcn.com)
- [OriginUI](https://originui.com)
- [Kibo UI](https://kibo-ui.com)
- [shadcn Registries](https://shadcn-registries.vercel.app)
- [registry.directory](https://registry.directory)

## Credits

This repo was initialized from [`ayoubphy/react-router-trpc-prisma-better-auth`](https://github.com/ayoubphy/react-router-trpc-prisma-better-auth)
