FROM node:20.9.0-slim AS build
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --no-frozen-lockfile
RUN pnpm run -r build
RUN pnpm deploy --filter=api-graphql --prod /prod/api-graphql
RUN pnpm deploy --filter=api-grpc --prod /prod/api-grpc
RUN pnpm deploy --filter=api-rest --prod /prod/api-rest

FROM gcr.io/distroless/nodejs20-debian11:nonroot AS api-graphql
COPY --from=build /prod/api-graphql /prod/api-graphql
WORKDIR /prod/api-graphql
CMD ["lib/main.js"]

FROM gcr.io/distroless/nodejs20-debian11:nonroot AS api-grpc
COPY --from=build /prod/api-grpc /prod/api-grpc
WORKDIR /prod/api-grpc
CMD ["lib/main.js"]

FROM gcr.io/distroless/nodejs20-debian11:nonroot AS api-rest
COPY --from=build /prod/api-rest /prod/api-rest
WORKDIR /prod/api-rest
CMD ["lib/main.js"]
