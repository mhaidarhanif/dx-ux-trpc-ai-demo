<div align="center">
	<h1 align="center">🐶Dogokit Shiba</h1>
  <p align="center">
    <span>Full Stack App Development Kit</span>
    <br />
    <a href="https://shiba.dogokit.com">🚧 Live Demo</a>
  </p>
</div>

## Goal

Dogokit Shiba is the implementation details of [Dogokit Akita](https://github.com/dogokit/dogokit-akita), mainly using:

- React Router v7 Framework
- tRPC
- Prisma
- Better Auth
- Tailwind CSS and shadcn/ui

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

## Credits

This repo was initialized from [`ayoubphy/react-router-trpc-prisma-better-auth`](https://github.com/ayoubphy/react-router-trpc-prisma-better-auth)
