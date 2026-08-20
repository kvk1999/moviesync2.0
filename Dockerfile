# Stage 1: Build React + Vite app
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci || npm install

COPY . .
RUN npm run build

# Stage 2: Serve with Nginx for Cloud Run / Production
FROM nginx:alpine

# Default PORT fallback if not provided by environment (e.g. Cloud Run provides PORT=8080)
ENV PORT=8080

# Copy custom Nginx configuration template
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Copy built application assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
