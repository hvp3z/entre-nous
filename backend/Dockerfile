# Backend Dockerfile for Railway deployment
FROM node:20-alpine

WORKDIR /app

# Copy package files from root and backend
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY shared/ ./shared/

# Install dependencies
WORKDIR /app/backend
RUN npm ci

# Copy source code
COPY backend/ ./

ENV NODE_ENV=production

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/health || exit 1

# Use tsx to run TypeScript directly (same as dev mode)
CMD ["npx", "tsx", "src/server.ts"]

