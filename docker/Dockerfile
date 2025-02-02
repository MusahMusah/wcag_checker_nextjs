FROM node:21-alpine AS base

FROM base AS builder

WORKDIR /app
ARG APP_ENV

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
# to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json* ./
COPY .env.${APP_ENV} .env.production
ADD ./nextbuild.tar.gz .

FROM base AS runner

WORKDIR /app
ARG APP_ENV
ARG APP_VERSION
ENV NODE_ENV=${APP_ENV}
ENV APP_VERSION=${APP_VERSION}

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3001
ENV PORT=3001

CMD HOSTNAME="0.0.0.0" node server.js
