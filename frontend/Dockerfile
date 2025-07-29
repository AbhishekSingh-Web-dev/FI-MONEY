### STAGE 1: Build the React application ###
FROM node:18-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package files and install all dependencies for the build process
COPY package*.json ./
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Vite uses environment variables prefixed with VITE_.
# This build argument is passed from the docker-compose.yml file.
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Build the application for production
RUN npm run build

### STAGE 2: Serve the static files with Nginx ###
FROM nginx:stable-alpine

# Copy the built static files from the 'builder' stage to the Nginx public directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx listens on port 80 by default, so we expose it
EXPOSE 80

# The Nginx image has a default command to start the server.