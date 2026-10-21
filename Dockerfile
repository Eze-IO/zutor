# Builds and serves the Zutor Vue app from the repository root:
#   docker build -t zutor-app .
#   docker run -p 8080:8080 zutor-app
# The app calls the API at http://<host>:4000/api; start it with `docker compose up` (or
# pass --build-arg VITE_API_URL=... to point elsewhere).

# Build stage: compile the Vue app with Vite
FROM node:24-alpine AS build
WORKDIR /app

COPY app/package*.json ./
RUN npm ci

COPY app/ .
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build && chmod -R a+rX dist

# Serve stage: static files via nginx, with history-mode fallback to index.html
FROM nginx:1.29-alpine
COPY app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080
