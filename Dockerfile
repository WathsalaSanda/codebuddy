# syntax=docker/dockerfile:1

# ---------- Stage 1: Build ----------
FROM node:20-bullseye-slim AS builder

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install all dependencies including mysql2
RUN npm install

# Copy rest of the project
COPY . .

# Build Next.js app
RUN npm run build


# ---------- Stage 2: Runtime ----------
FROM node:20-bullseye-slim AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copy necessary files
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Ensure mysql2 exists in runtime layer
RUN npm install mysql2

EXPOSE 3000

CMD ["npm", "run", "start"]
