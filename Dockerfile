FROM node:20 AS base

FROM base AS prod-build
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# Fix issue with pnpm install https://vercel.com/guides/corepack-errors-github-actions
RUN npm install -g corepack@latest
RUN corepack enable
COPY package.json pnpm-lock.yaml /app/
WORKDIR /app
# --ignore-scripts is used to prevent https://github.com/pnpm/pnpm/issues/7068
RUN pnpm install --prod --ignore-scripts
COPY . /app
RUN pnpm build

FROM base
WORKDIR /app
RUN chown node:node /app
USER node
COPY --from=prod-build --chown=node:node /app/node_modules /app/node_modules
COPY --from=prod-build --chown=node:node /app/dist /app/dist

ENV HOST=0.0.0.0
ENV PORT=8080
EXPOSE 8080
CMD ["node", "/app/dist/server/entry.mjs"]
