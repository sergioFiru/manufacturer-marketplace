FROM node:22.20.0-alpine3.22

# Set working directory
WORKDIR /app

# Copy package files (if they exist)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app
COPY . .

# Expose the Vite dev server port
EXPOSE 5173

# Default command
CMD ["npm", "run", "dev"]
