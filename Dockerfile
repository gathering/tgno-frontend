FROM node:lts AS base

FROM base AS prod-build
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY package.json pnpm-lock.yaml /app/
WORKDIR /app
RUN pnpm install --prod
COPY . /app
RUN pnpm run build

FROM base
WORKDIR /app
RUN chown node:node /app
USER node
COPY --from=prod-build --chown=node:node /app/node_modules /app/node_modules
COPY --from=prod-build --chown=node:node /app/dist /app/dist

ENV HOST=0.0.0.0
ENV PORT=8080
EXPOSE 8080
CMD node /app/dist/server/entry.mjs