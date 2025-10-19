# ---- Stage 1: Build ----
FROM node:20-bullseye-slim AS builder
WORKDIR /app

# Install build deps
RUN apt-get update \
 && apt-get install -y --no-install-recommends python3 make g++ \
 && rm -rf /var/lib/apt/lists/*

# Copy dependency files
COPY package*.json ./
RUN npm ci

# Copy the rest of the project
COPY . .

# Build Next.js (creates the .next folder inside container)
RUN npm run build

# ---- Stage 2: Runtime ----
FROM node:20-bullseye-slim
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.* ./

EXPOSE 3000
CMD ["npm", "start"]
