FROM node:22.20.0-alpine3.22

# Set working directory
WORKDIR /app

# Copy package files (if they exist)
COPY package*.json ./

# Install dependencies (won’t do anything yet if file is empty)
RUN npm install || true

# Copy rest of the app
COPY . .

# Expose the Vite dev server port
EXPOSE 5173

# Default command
CMD ["npm", "run", "dev"]
