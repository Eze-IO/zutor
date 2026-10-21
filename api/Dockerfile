FROM node:25-alpine
WORKDIR /api

COPY --chown=node:node package*.json ./
RUN npm ci --omit=dev

COPY --chown=node:node . .

ENV NODE_ENV=production
USER node
EXPOSE 4000
CMD ["node", "server.js"]
