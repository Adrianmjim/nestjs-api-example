FROM node:20.9.0-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
RUN pnpm run -r build
RUN pnpm deploy --filter=api-graphql --prod /prod/api-graphql
RUN pnpm deploy --filter=api-grpc --prod /prod/api-grpc
RUN pnpm deploy --filter=api-rest --prod /prod/api-rest

FROM base AS api-graphql
COPY --from=build /prod/api-graphql /prod/api-graphql
WORKDIR /prod/api-graphql
RUN pnpm build

FROM base AS api-grpc
COPY --from=build /prod/api-grpc /prod/api-grpc
WORKDIR /prod/api-grpc

FROM base AS api-rest
COPY --from=build /prod/api-rest /prod/api-rest
WORKDIR /prod/api-rest