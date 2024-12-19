# Use official Node.js v22 image as base
FROM node:22

# Set working directory
WORKDIR /usr/src/server

# Install pnpm
RUN npm install -g pnpm

# Copy package.json and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source files
COPY . .

# Build the server
RUN pnpm run build

# Expose port 3000
EXPOSE 3000

# Start the server
CMD ["pnpm", "start:prod"]
