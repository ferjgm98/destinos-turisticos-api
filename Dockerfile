# FROM: https://docs.nestjs.com/deployment#dockerizing-your-application
# Use the official Node.js image as the base image
FROM node:20-alpine

# Create non-root user to run the app
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Set the working directory inside the container
WORKDIR /usr/src/app

# Change ownership of working directory
RUN chown nestjs:nodejs /usr/src/app

# Switch to the non-root user
USER nestjs

# Copy package.json and package-lock.json to the working directory
COPY --chown=nestjs:nodejs package*.json ./

# Install the application dependencies
RUN npm ci

# Copy the rest of the application files
COPY --chown=nestjs:nodejs . .

# Generate Prisma client
RUN npx prisma generate

# Build the NestJS application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main"]