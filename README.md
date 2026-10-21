# Zutor 👨‍🏫

A tutoring scheduling application. Students register, sign in, and schedule, reschedule, or cancel tutoring sessions.

Created by Eze Ahuna.

## Stack

| Service | Folder | Tech |
| --- | --- | --- |
| Frontend | [`app/`](app) | Vue 3, Vue Router, Vuex, Vite, PrimeVue 4 (Aura theme), served by nginx in Docker |
| API | [`api/`](api) | Node.js 24, Express 5, Mongoose 9 |
| Database | [`db/`](db) | MongoDB 8, seeded with demo data on first start |

## Run with Docker

```bash
docker compose up --build
```

- App: http://localhost:8080
- API: http://localhost:4000/api
- MongoDB: `mongodb://localhost:27017/ZutorDB`

The first time its volume is created, the database is filled with fake demo data from [`db/seed.js`](db/seed.js). Log in with **demo@zutor.test** / **demo1234** to try it out, or sign up for a new account. To reset to the demo data:

```bash
docker compose down -v
```

### Frontend only

The [`Dockerfile`](Dockerfile) in the repository root builds just the Vue app and serves it with nginx:

```bash
docker build -t zutor-app .
docker run -p 8080:8080 zutor-app
```

Then open http://localhost:8080. This image contains only the website: logging in and sessions need the API at `http://<host>:4000/api`, so run the full stack with `docker compose up --build` for a working app.

To point the website at an API somewhere else, set its URL at build time:

```bash
docker build --build-arg VITE_API_URL=https://your-api.example.com/api -t zutor-app .
```

## Local development

Requires Node.js 20+ and a MongoDB instance (for example `docker compose up zutor-db`).

```bash
# API (http://localhost:4000)
cd api
npm install
npm run dev

# Frontend (http://localhost:8080)
cd app
npm install
npm run dev
```

### Configuration

| Variable | Used by | Default |
| --- | --- | --- |
| `MONGO_URL` | API | `mongodb://localhost:27017/ZutorDB` |
| `PORT` | API | `4000` |
| `VITE_API_URL` | Frontend (build time) | `http://<current host>:4000/api` |

## Scripts

| Folder | Command | Description |
| --- | --- | --- |
| `app` | `npm run dev` | Start the Vite dev server |
| `app` | `npm run build` | Production build into `app/dist` |
| `app` | `npm run lint` | Lint with ESLint |
| `api` | `npm start` | Start the API |
| `api` | `npm run dev` | Start the API and restart on file changes |

## Known limitations

This started as a student project and is not production-ready:

- Passwords are stored in plain text, and the auth "token" is the user's id. Use hashed passwords (e.g. bcrypt) and signed tokens (e.g. JWT) before deploying anywhere public.
- The API has no authorization checks, so any client can edit or delete any record.
