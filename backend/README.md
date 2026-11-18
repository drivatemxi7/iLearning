# LMDRP Backend (NestJS + PostgreSQL + Prisma)

Backend starter for the Learning Management and Digital Resource Platform.

## Included

- NestJS REST API
- PostgreSQL 16 using Docker Compose
- Prisma ORM and initial schema
- JWT authentication and bcrypt password hashing
- Roles: `USER`, `STUDENT`, `TEACHER`, `ADMIN`
- Modules: auth, users, courses, registrations, library, notifications, health
- DTO validation, role decorator and guards
- `.env.example` (copy it to `.env`)

A normal account is a `USER`. Creating an account does **not** automatically enrol someone as a student. A person becomes an enrolled student through a course registration. The `STUDENT` role can be assigned by an administrator when the platform's approval workflow is implemented.

## 1. Configure environment

```bash
cp .env.example .env
```

Change `POSTGRES_PASSWORD` and `JWT_SECRET`. Use a long random JWT secret. Do not commit `.env`.

The provided `DATABASE_URL` uses hostname `db`, which is correct when the API runs inside Docker Compose. If you run NestJS directly on your computer, change the hostname in `DATABASE_URL` from `db` to `localhost`.

## 2. Run with Docker

From this backend directory:

```bash
docker compose up --build
```

The API listens on port 3000 and PostgreSQL on port 5432. The API container waits for PostgreSQL health, then applies migrations and starts NestJS in watch mode.

In GitHub Codespaces, open port 3000 from the Ports tab. Set its visibility according to your needs. The frontend should use the forwarded API URL as its API base URL; configure CORS/`FRONTEND_URL` to match the frontend origin.

## 3. Run locally without Docker

You need Node.js 20+ and a running PostgreSQL database.

```bash
npm install
```

Set `DATABASE_URL` in `.env` to your local database, then:

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run start:dev
```

## 4. Initial API routes

| Method | Route | Access |
|---|---|---|
| GET | `/api/health` | Public |
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/users/me` | Authenticated |
| PATCH | `/api/users/me` | Authenticated |
| GET | `/api/courses` | Public |
| GET | `/api/courses/:id` | Public |
| POST | `/api/courses` | ADMIN |
| POST | `/api/registrations` | Authenticated |
| GET | `/api/registrations/my` | Authenticated |
| GET | `/api/library` | Public metadata listing |
| GET | `/api/notifications/my` | Authenticated |

The course-create route and some management operations are protected for future admin use. A secure admin bootstrap/management workflow still needs to be implemented before production deployment.

## 5. Example registration payload

```json
{
  "fullName": "Jane Banda",
  "email": "jane@example.com",
  "phone": "+265991234567",
  "password": "Use-A-Strong-Password-123"
}
```

## 6. Important next steps

This is a development foundation, not a production-ready deployment. Before public release, add email verification, password reset, rate limiting, audit logs, admin bootstrap, payment verification, file storage, stronger authorization policies, tests, backups and production secrets management.

Library file upload/payment access, teacher classroom management, assignment submission and Zoom scheduling are planned modules, not implemented features in this starter.
