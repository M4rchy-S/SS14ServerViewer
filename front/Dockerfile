# Stage 1: Build the React app
FROM node:22 AS build
# Set the working directory
WORKDIR /app
# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the app files
COPY . .
# Build the app
RUN npm run build
# Stage 2: Serve with Nginx
FROM nginx:alpine
# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy the build from the first stage to the Nginx container
COPY --from=build /app/dist /usr/share/nginx/html
# Expose port 80 for Nginx
EXPOSE 80
# Start Nginx
CMD ["nginx", "-g", "daemon off;"]