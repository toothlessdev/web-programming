# Use the official Node.js 16 image as a base image
FROM node:16

# Create and set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the port that the app runs on
EXPOSE 8080

# Start the NestJS application
CMD ["npm", "run", "start:prod"]
