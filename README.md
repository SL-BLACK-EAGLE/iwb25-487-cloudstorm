# SmartRelief Platform

SmartRelief microservice stack (Ballerina) with Auth + Aid Request services backed by PostgreSQL, basic JWT issuance and API Gateway routing. Frontend admin dashboard skeleton present.

## Run (development)

Prerequisites: Docker + Docker Compose.

```
docker compose up --build
```

Core endpoints via Gateway (http://localhost:8080):
- GET  /health
- POST /auth/register { email, password, role? }
- POST /auth/login { email, password }
- GET  /auth/profile (Authorization: Bearer <token>)
- GET  /aid/requests
- POST /aid/requests  (Authorization: Bearer <token>) { title, description?, category?, urgency_level? }

Example flow (pseudo):
1. Register: POST http://localhost:8080/auth/register -> receive token
2. Create Aid Request: POST http://localhost:8080/aid/requests with Authorization header
3. List Aid Requests: GET http://localhost:8080/aid/requests

Frontend (after installing deps):
```
cd frontend/admin-dashboard
npm install
npm run dev
```

Status: Phase 1 core auth + aid request persistence implemented (baseline). Remaining phases (donor, volunteer, matching, notifications, location, analytics, frontend build-out, testing, observability, deployment) pending per project plan.
