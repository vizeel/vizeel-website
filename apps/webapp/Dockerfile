# --- Build Stage ---
FROM node:22-alpine AS builder
WORKDIR /app

# Accept build arguments for Vite environment variables (for React app)
ARG VITE_API_URL

# Set them as environment variables for the build
ENV VITE_API_URL=$VITE_API_URL

# Copy monorepo setup files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/webapp/package.json ./apps/webapp/
COPY packages/ ./packages/

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY apps/webapp/ ./apps/webapp/

# Build the app with environment variables available
RUN VITE_API_URL=$VITE_API_URL \
    pnpm turbo run build --filter=webapp

# --- Runtime Stage ---
FROM nginx:alpine

# Install curl for health checks and gettext for envsubst
RUN apk add --no-cache gettext curl

# Copy built application
COPY --from=builder /app/apps/webapp/dist /usr/share/nginx/html

# Copy nginx template (for runtime variable substitution)
COPY apps/webapp/nginx.template.conf /etc/nginx/templates/default.conf.template

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/health || exit 1

# Start nginx with environment variable substitution for proxy URLs
CMD ["sh", "-c", "envsubst '${VITE_API_GATEWAY}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]