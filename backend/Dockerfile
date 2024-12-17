# Use the official Node.js image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code
COPY . .

# Expose the backend port
EXPOSE 8000

# Run the server
CMD ["npm", "start"]
