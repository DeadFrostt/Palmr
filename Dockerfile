# Use the official Node.js image as a base image
FROM node:18 AS base

# Set the working directory for the server
WORKDIR /app/server

# Install necessary packages and pnpm
RUN apt-get update && apt-get install -y netcat-traditional
RUN npm install -g pnpm

# Copy server dependency files
COPY apps/server/package*.json ./
COPY apps/server/pnpm-lock.yaml ./
COPY apps/server/prisma ./prisma/
COPY apps/server/scripts ./scripts/

# Remove existing prisma node_modules and install dependencies
RUN rm -rf node_modules/.prisma
RUN pnpm install --frozen-lockfile

# Generate prisma client
RUN npx prisma generate

# Copy server source code and build it
COPY apps/server ./
RUN pnpm build
RUN chmod +x ./scripts/start.sh

# Set the working directory for the web
WORKDIR /app/web

# Copy web dependency files
COPY apps/web/package.json ./
COPY apps/web/pnpm-lock.yaml ./

# Install web dependencies and build the web app
RUN pnpm install
COPY apps/web ./
RUN pnpm build

# Expose ports for server and web
EXPOSE 3333 4173

# Set environment variable for Vite
ENV VITE_ROUTER_MODE=history

# Start both the server and web app
CMD ["sh", "-c", "./scripts/start.sh & pnpm preview --host"]
