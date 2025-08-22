FROM oven/bun:alpine AS dependencies-env
RUN apk add --no-cache build-base python3 py3-pip
COPY . /app

FROM dependencies-env AS development-dependencies-env
COPY ./package.json bun.lock /app/
WORKDIR /app
RUN bun install

FROM dependencies-env AS production-dependencies-env
COPY ./package.json bun.lock /app/
WORKDIR /app
RUN bun install

FROM dependencies-env AS build-env
COPY ./package.json bun.lock /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN bun run build:docker

FROM dependencies-env
COPY ./package.json bun.lock /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app
CMD ["bun", "run", "start"]