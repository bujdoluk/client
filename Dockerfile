# Use official image from docker hub
FROM node:lts-alpine3.20 as build-stage

# Set working directory
WORKDIR /app

# Copy working directory in the container
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build Vue app to production mode dist folder
RUN npm run build:prod

# Use nginx image for nginx container
FROM nginx:stable-alpine as production-stage

# Copy the build application from previous stage to the nginx container
COPY - from=build-stage /app/dist /usr/share/nginx/html ./

# Copy nginx configuration file
COPY ./default.conf /etc/nginx/conf.d/default.conf

# Export port
EXPOSE 80

# Start nginx to serve the application
CMD ["nginx", "-g", "deamon off"]
