# --- Stage 1: Build the NestJS app ---
FROM node:18.20.2-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the TypeScript app
RUN npm run build
RUN ls -l dist


# --- Stage 2: Run the app ---
FROM node:18.20.2-alpine

# Set working directory
WORKDIR /app

# Copy only needed files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist


# Set environment
ENV NODE_ENV=production

# Expose the port NestJS listens on
EXPOSE 3000

# Start the application
# CMD ["node", "dist/main.js"]
CMD ["npm", "run", "start:prod"]
