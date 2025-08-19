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

## Current Status

Implemented services (baseline functional):
- Auth Service (register/login/profile)
- Aid Request Service (create/list aid requests)
- Donor Management Service (create/list/get donors, donations, history, update categories, duplicate email handling)
- Volunteer Coordination Service (volunteers CRUD-lite, tasks, assignment)
- Resource Matching Service (suggestions by category overlap)
- Notification Service (in-memory email/sms queue)
- Location Service (stub geocode + recent cache)
- Analytics Service (summary counts + totals)
- Gateway Service (proxies all above)
- Admin Dashboard (Next.js dev UI skeleton)

Core Gateway Endpoints (http://localhost:8080):
- GET  /health
- POST /auth/register
- POST /auth/login
- GET  /auth/profile
- GET  /aid/requests
- POST /aid/requests
- POST /donors
- GET  /donors
- GET  /donors/{id}
- POST /donors/{id}/donations
- GET  /donors/{id}/history
- PUT  /donors/{id}/categories
- GET  /matching/suggestions
- POST /notifications/email
- POST /notifications/sms
- GET  /notifications/queue
- POST /locations/geocode
- GET  /locations/recent
- GET  /analytics/summary

Next potential enhancements (not yet implemented):
- Real email/SMS integration
- WebSocket push notifications
- Kafka event pipeline
- Redis caching for frequently accessed queries
- Proper JWT verification & roles
- Tests & monitoring dashboards
