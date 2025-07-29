# Use an official Node.js runtime as a parent image.
FROM node:18-alpine

# Set the working directory inside the container.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to leverage Docker layer caching.
COPY package*.json ./

# Install only production dependencies for a smaller and more secure image.
RUN npm ci --only=production

# Copy the rest of your application's source code into the container.
COPY . .

# Expose the port the app runs on.
EXPOSE 5000

# The command to run the app in production.
CMD [ "node", "index.js" ]