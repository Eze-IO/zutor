FROM mongo:8

# Demo data, loaded by the image's entrypoint the first time the database volume is created
COPY --chmod=644 seed.js /docker-entrypoint-initdb.d/seed.js

EXPOSE 27017
