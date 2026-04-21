# ──────────────────────────────────────────
#  Stage 1 — Install production dependencies
# ──────────────────────────────────────────
FROM node:20-alpine AS deps

WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev --ignore-scripts

# ──────────────────────────────────────────
#  Stage 2 — Lean production image
# ──────────────────────────────────────────
FROM node:20-alpine AS runner

LABEL org.opencontainers.image.title="ecs-blue-app"
LABEL org.opencontainers.image.version="1.0.0"
LABEL deployment.color="blue"

WORKDIR /app

# Copy deps from stage 1, then source
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Non-root user for security (required by ECS best practices)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

ENV PORT=3000 \
    NODE_ENV=production

EXPOSE 3000

# ECS health checks are done via ALB Target Group,
# but this is useful for local docker run testing
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "index.js"]