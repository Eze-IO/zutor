# Build stage: compile the Vue app with Vite
FROM node:26-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
# Optional: point the app at a different API (defaults to http://<current host>:4000/api)
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build && chmod -R a+rX dist

# Serve stage: static files via nginx
FROM nginx:1.29-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080
