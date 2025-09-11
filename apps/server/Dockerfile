# ---- Build Stage ----
    FROM node:22-alpine AS builder
    WORKDIR /app
    
    # Install pnpm
    RUN npm install -g pnpm
    
    # Copy workspace configuration
    COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
    COPY turbo.json ./
    
    # Copy all source code
    COPY packages ./packages
    COPY apps ./apps
    
    # Install all dependencies
    RUN pnpm install --frozen-lockfile
    
    # Build everything
    RUN pnpm run build --filter server...
    
    # ---- Production Stage ----
    FROM node:22-alpine AS runner
    WORKDIR /app
    
    # Install pnpm
    RUN npm install -g pnpm
    
    # Copy the entire built workspace from builder stage
    COPY --from=builder /app ./
    
    # Clean install for production (this will preserve the workspace structure)
    RUN pnpm install --prod --frozen-lockfile
    
    # Verify the required files exist
    RUN test -f /app/packages/backend-shared/schemas/dist/index.js || (echo "FATAL: schemas/dist/index.js not found" && exit 1)
    RUN test -f /app/packages/backend-shared/config/dist/index.js || (echo "FATAL: config/dist/index.js not found" && exit 1)
    RUN test -f /app/packages/backend-shared/utils/dist/index.js || (echo "FATAL: utils/dist/index.js not found" && exit 1)
    RUN test -f /app/apps/server/dist/src/main.js || (echo "FATAL: server/dist/src/main.js not found" && exit 1)
    
    # Set working directory to the app
    WORKDIR /app/apps/server
    
    # Expose NestJS port
    EXPOSE 4001
    
    # Start the app
    CMD ["node", "dist/src/main.js"]