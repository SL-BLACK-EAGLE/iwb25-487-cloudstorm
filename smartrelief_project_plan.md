# SmartRelief - Decentralized Disaster Relief Platform
## Project Plan & Architecture

---

## 📋 **Project Timeline & Phases**

### **Phase 1: Foundation Setup (Weeks 1-4)**
- **Week 1-2**: Environment setup, repository structure, CI/CD pipeline
- **Week 3-4**: Core authentication service, database setup, basic gateway

### **Phase 2: Core Services (Weeks 5-12)**
- **Week 5-6**: Aid Request Service + PostgreSQL integration
- **Week 7-8**: Donor Management Service + MongoDB integration
- **Week 9-10**: Volunteer Coordination Service + Redis caching
- **Week 11-12**: Resource Matching Service + Kafka messaging

### **Phase 3: Communication & Integration (Weeks 13-16)**
- **Week 13-14**: Notification Service (Email, SMS, WebSocket)
- **Week 15-16**: Location Service + analytics integration

### **Phase 4: Frontend & Admin (Weeks 17-20)**
- **Week 17-18**: Next.js frontend development
- **Week 19-20**: Admin dashboard + analytics service

### **Phase 5: Testing & Deployment (Weeks 21-24)**
- **Week 21-22**: Integration testing, load testing
- **Week 23-24**: Kubernetes deployment, monitoring setup

---

## 🏗️ **Project Structure**

```
smartrelief-platform/
├── 📁 backend/
│   ├── 📁 services/
│   │   ├── 📁 auth-service/
│   │   ├── 📁 aid-request-service/
│   │   ├── 📁 donor-management-service/
│   │   ├── 📁 volunteer-coordination-service/
│   │   ├── 📁 resource-matching-service/
│   │   ├── 📁 notification-service/
│   │   ├── 📁 location-service/
│   │   ├── 📁 analytics-service/
│   │   └── 📁 gateway-service/
│   ├── 📁 shared/
│   │   ├── 📁 types/
│   │   ├── 📁 utils/
│   │   └── 📁 configs/
│   └── 📁 tests/
├── 📁 frontend/
│   ├── 📁 admin-dashboard/
│   ├── 📁 public-portal/
│   └── 📁 mobile-app/
├── 📁 infrastructure/
│   ├── 📁 kubernetes/
│   ├── 📁 docker/
│   ├── 📁 terraform/
│   └── 📁 monitoring/
├── 📁 docs/
├── 📁 scripts/
└── 📄 docker-compose.yml
```

---

## 🛠️ **Detailed Service Architecture**

### **1. Authentication Service**
**Technology**: Ballerina + JWT/OAuth2 + Redis
```ballerina
// Dependencies
import ballerina/http;
import ballerina/jwt;
import ballerina/oauth2;
import ballerina/crypto;
import ballerina/cache;
```

**Features**:
- JWT token generation/validation
- OAuth2 integration
- Role-based access control (Victim, Donor, Volunteer, Admin, NGO)
- Session management with Redis
- Password encryption

**API Endpoints**:
- `POST /auth/login`
- `POST /auth/register`
- `POST /auth/refresh`
- `POST /auth/logout`
- `GET /auth/profile`

---

### **2. Aid Request Service**
**Technology**: Ballerina + PostgreSQL + Kafka + WebSocket
```ballerina
// Dependencies
import ballerina/http;
import ballerina/sql;
import ballerina/postgresql;
import ballerina/websocket;
import ballerina/kafka;
import ballerina/uuid;
import ballerina/time;
```

**Features**:
- Geotagged aid requests
- Priority scoring algorithm
- Real-time updates via WebSocket
- Image/document upload support
- Status tracking

**Database Schema**:
```sql
CREATE TABLE aid_requests (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(50), -- medical, food, shelter, etc.
    urgency_level INTEGER, -- 1-5 scale
    location_lat DECIMAL(10,8),
    location_lng DECIMAL(11,8),
    address TEXT,
    items_needed JSONB,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

**API Endpoints**:
- `POST /aid-requests`
- `GET /aid-requests`
- `GET /aid-requests/{id}`
- `PUT /aid-requests/{id}`
- `DELETE /aid-requests/{id}`
- `GET /aid-requests/nearby`

---

### **3. Donor Management Service**
**Technology**: Ballerina + MongoDB + Kafka
```ballerina
// Dependencies
import ballerina/http;
import ballerinax/mongodb;
import ballerina/kafka;
import ballerina/crypto;
import ballerina/uuid;
```

**Features**:
- Donor profile management
- Donation tracking and history
- Impact analytics
- Recurring donation setup
- Transparency reports

**MongoDB Collections**:
```json
// donors collection
{
  "_id": "ObjectId",
  "userId": "UUID",
  "profile": {
    "name": "string",
    "email": "string",
    "phone": "string",
    "organization": "string"
  },
  "preferences": {
    "categories": ["medical", "food"],
    "maxDistance": 50,
    "notificationSettings": {}
  },
  "donationHistory": [
    {
      "donationId": "UUID",
      "amount": 1000,
      "currency": "USD",
      "aidRequestId": "UUID",
      "timestamp": "ISO Date",
      "status": "completed"
    }
  ],
  "totalContributed": 5000,
  "impactMetrics": {
    "peopleHelped": 25,
    "requestsFulfilled": 12
  }
}
```

**API Endpoints**:
- `POST /donors`
- `GET /donors/{id}`
- `PUT /donors/{id}`
- `POST /donors/{id}/donations`
- `GET /donors/{id}/history`
- `GET /donors/{id}/impact`

---

### **4. Volunteer Coordination Service**
**Technology**: Ballerina + PostgreSQL + Redis + WebSocket
```ballerina
// Dependencies
import ballerina/http;
import ballerina/sql;
import ballerina/postgresql;
import ballerina/websocket;
import ballerinax/redis;
import ballerina/time;
```

**Features**:
- Volunteer registration and skills matching
- Task assignment based on location/skills
- Real-time GPS tracking
- Availability scheduling
- Performance tracking

**Database Schema**:
```sql
CREATE TABLE volunteers (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    skills JSONB, -- ["medical", "logistics", "translation"]
    availability JSONB, -- schedule preferences
    location_lat DECIMAL(10,8),
    location_lng DECIMAL(11,8),
    max_travel_distance INTEGER DEFAULT 25,
    rating DECIMAL(3,2) DEFAULT 0.0,
    total_tasks INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE volunteer_tasks (
    id UUID PRIMARY KEY,
    volunteer_id UUID REFERENCES volunteers(id),
    aid_request_id UUID,
    task_type VARCHAR(50),
    description TEXT,
    estimated_duration INTEGER, -- minutes
    status VARCHAR(20) DEFAULT 'assigned',
    assigned_at TIMESTAMP DEFAULT NOW(),
    started_at TIMESTAMP,
    completed_at TIMESTAMP
);
```

**API Endpoints**:
- `POST /volunteers`
- `GET /volunteers/{id}`
- `PUT /volunteers/{id}`
- `POST /volunteers/{id}/tasks`
- `PUT /volunteers/{id}/tasks/{taskId}/status`
- `GET /volunteers/nearby`

---

### **5. Resource Matching Service**
**Technology**: Ballerina + Kafka + Redis + Elasticsearch
```ballerina
// Dependencies
import ballerina/http;
import ballerina/kafka;
import ballerinax/redis;
import ballerinax/elasticsearch;
import ballerina/log;
```

**Features**:
- AI-powered resource-to-need matching
- Geospatial matching algorithms
- Real-time optimization
- Priority-based allocation
- Performance analytics

**Matching Algorithm**:
- Distance-based scoring
- Urgency priority weighting
- Resource availability checking
- Volunteer skill matching
- Cost optimization

**API Endpoints**:
- `POST /matching/find-matches`
- `POST /matching/allocate-resources`
- `GET /matching/analytics`

---

### **6. Notification Service**
**Technology**: Ballerina + Kafka + WebSocket + SMTP + SMS API
```ballerina
// Dependencies
import ballerina/http;
import ballerina/kafka;
import ballerina/websocket;
import ballerina/email;
import ballerina/log;
```

**Features**:
- Multi-channel notifications (Email, SMS, Push, WebSocket)
- Template-based messaging
- Delivery tracking
- User preference management
- Emergency broadcast capability

**Notification Types**:
- Aid request updates
- Donation confirmations
- Volunteer task assignments
- Emergency alerts
- Status updates

**API Endpoints**:
- `POST /notifications/send`
- `POST /notifications/broadcast`
- `GET /notifications/{userId}`
- `PUT /notifications/preferences`

---

### **7. Location Service**
**Technology**: Ballerina + PostgreSQL (PostGIS) + Redis
```ballerina
// Dependencies
import ballerina/http;
import ballerina/sql;
import ballerina/postgresql;
import ballerinax/redis;
import ballerina/regex;
```

**Features**:
- Geocoding/reverse geocoding
- Distance calculations
- Area boundary management
- Disaster zone mapping
- Location-based queries

**API Endpoints**:
- `POST /locations/geocode`
- `POST /locations/reverse-geocode`
- `GET /locations/nearby`
- `GET /locations/disaster-zones`

---

### **8. Analytics Service**
**Technology**: Ballerina + MongoDB + Elasticsearch + Kafka
```ballerina
// Dependencies
import ballerina/http;
import ballerinax/mongodb;
import ballerinax/elasticsearch;
import ballerina/kafka;
import ballerina/time;
```

**Features**:
- Real-time dashboard metrics
- Performance analytics
- Impact measurement
- Trend analysis
- Custom reporting

**Metrics Tracked**:
- Response times
- Fulfillment rates
- Geographic distribution
- Resource utilization
- User engagement

**API Endpoints**:
- `GET /analytics/dashboard`
- `GET /analytics/reports`
- `GET /analytics/metrics`
- `POST /analytics/custom-query`

---

### **9. Gateway Service**
**Technology**: Ballerina HTTP Gateway
```ballerina
// Dependencies
import ballerina/http;
import ballerina/jwt;
import ballerina/cache;
import ballerina/log;
import ballerina/regex;
```

**Features**:
- API routing and load balancing
- Authentication middleware
- Rate limiting
- Request/response transformation
- API versioning
- CORS handling

**Configuration**:
```ballerina
// Gateway routing configuration
http:LoadBalanceClient aidRequestService = check new({
    targets: [
        {url: "http://aid-request-service:8080"},
        {url: "http://aid-request-service-2:8080"}
    ],
    algorithm: http:ROUND_ROBIN
});
```

---

## 🖥️ **Next.js Frontend Architecture**

### **Admin Dashboard Structure**
```
frontend/admin-dashboard/
├── 📁 src/
│   ├── 📁 components/
│   │   ├── 📁 common/
│   │   ├── 📁 dashboard/
│   │   ├── 📁 aid-requests/
│   │   ├── 📁 donors/
│   │   ├── 📁 volunteers/
│   │   └── 📁 analytics/
│   ├── 📁 pages/
│   │   ├── 📁 api/
│   │   ├── 📄 index.tsx
│   │   ├── 📄 dashboard.tsx
│   │   ├── 📄 aid-requests.tsx
│   │   ├── 📄 donors.tsx
│   │   ├── 📄 volunteers.tsx
│   │   └── 📄 analytics.tsx
│   ├── 📁 hooks/
│   ├── 📁 utils/
│   ├── 📁 types/
│   └── 📁 styles/
├── 📄 package.json
├── 📄 next.config.js
└── 📄 tailwind.config.js
```

### **Key Frontend Features**:
- Real-time dashboard with WebSocket integration
- Interactive maps for aid requests and volunteers
- Drag-and-drop resource allocation
- Mobile-responsive design
- Offline capability for disaster zones
- Progressive Web App (PWA) features

### **Technology Stack**:
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Real-time**: Socket.IO
- **Maps**: Mapbox GL JS
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios with interceptors

---

## 🐳 **Docker & Kubernetes Configuration**

### **Docker Compose for Development**
```yaml
version: '3.8'
services:
  # Databases
  postgresql:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: smartrelief
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./scripts/init-db.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"

  mongodb:
    image: mongo:7-jammy
    environment:
      MONGO_INITDB_DATABASE: smartrelief
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password
    volumes:
      - mongo_data:/data/db
    ports:
      - "27017:27017"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  elasticsearch:
    image: elasticsearch:8.11.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
    ports:
      - "9200:9200"
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data

  kafka:
    image: confluentinc/cp-kafka:7.5.0
    environment:
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
    ports:
      - "9092:9092"
    depends_on:
      - zookeeper

  zookeeper:
    image: confluentinc/cp-zookeeper:7.5.0
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
    ports:
      - "2181:2181"

  # Microservices
  gateway-service:
    build: ./backend/services/gateway-service
    ports:
      - "8080:8080"
    depends_on:
      - auth-service
      - aid-request-service
    environment:
      - AUTH_SERVICE_URL=http://auth-service:8081
      - AID_REQUEST_SERVICE_URL=http://aid-request-service:8082

  auth-service:
    build: ./backend/services/auth-service
    ports:
      - "8081:8081"
    depends_on:
      - postgresql
      - redis
    environment:
      - DATABASE_URL=postgresql://admin:password@postgresql:5432/smartrelief
      - REDIS_URL=redis://redis:6379

  aid-request-service:
    build: ./backend/services/aid-request-service
    ports:
      - "8082:8082"
    depends_on:
      - postgresql
      - kafka
    environment:
      - DATABASE_URL=postgresql://admin:password@postgresql:5432/smartrelief
      - KAFKA_BOOTSTRAP_SERVERS=kafka:9092

volumes:
  postgres_data:
  mongo_data:
  redis_data:
  elasticsearch_data:
```

### **Kubernetes Deployment Strategy**
- **Namespace**: `smartrelief-prod`
- **Ingress**: NGINX Ingress Controller
- **TLS**: Let's Encrypt certificates
- **Scaling**: Horizontal Pod Autoscaler (HPA)
- **Storage**: Persistent Volume Claims for databases
- **Monitoring**: Prometheus + Grafana
- **Logging**: ELK Stack (Elasticsearch, Logstash, Kibana)

---

## 🔧 **Development Guidelines**

### **Ballerina Best Practices**
1. **Error Handling**: Always use `check` for error propagation
2. **Type Safety**: Define custom types for all data structures
3. **Configuration**: Use configurable variables for environment-specific values
4. **Testing**: Write unit tests for all service functions
5. **Documentation**: Generate OpenAPI specs for all services

### **Code Quality Standards**
- **Linting**: ESLint for TypeScript, Ballerina formatter
- **Testing**: Jest for frontend, Ballerina test framework for backend
- **Coverage**: Minimum 80% test coverage
- **Pre-commit hooks**: Lint, format, test
- **Code review**: Required for all PRs

### **Security Guidelines**
- **Authentication**: JWT tokens with refresh mechanism
- **Authorization**: Role-based access control (RBAC)
- **Data Encryption**: TLS in transit, encryption at rest
- **Input Validation**: Validate all user inputs
- **Rate Limiting**: Prevent abuse and DoS attacks
- **Audit Logging**: Log all sensitive operations

---

## 📊 **Monitoring & Observability**

### **Metrics Collection**
- **Application Metrics**: Custom business metrics
- **System Metrics**: CPU, memory, disk, network
- **Database Metrics**: Connection pools, query performance
- **API Metrics**: Response time, error rate, throughput

### **Logging Strategy**
- **Structured Logging**: JSON format with correlation IDs
- **Log Levels**: ERROR, WARN, INFO, DEBUG
- **Centralized Logging**: ELK Stack or Grafana Loki
- **Log Retention**: 30 days for production logs

### **Alerting Rules**
- **High Error Rate**: >5% error rate for 5 minutes
- **High Response Time**: >1s average response time
- **Database Connection**: Connection pool exhaustion
- **Disk Usage**: >80% disk utilization
- **Memory Usage**: >85% memory utilization

---

## 🚀 **Deployment Pipeline**

### **CI/CD Workflow**
```yaml
# .github/workflows/deploy.yml
name: Deploy SmartRelief Platform

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Ballerina
        uses: ballerina-platform/setup-ballerina@v1
        with:
          version: 2201.10.0
      - name: Run Tests
        run: |
          cd backend
          bal test --coverage
      - name: Test Frontend
        run: |
          cd frontend/admin-dashboard
          npm ci
          npm run test

  build-and-deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Build Docker Images
        run: |
          docker build -t smartrelief/gateway-service backend/services/gateway-service
          docker build -t smartrelief/auth-service backend/services/auth-service
          # ... build all services
      - name: Deploy to Kubernetes
        run: |
          kubectl apply -f infrastructure/kubernetes/
```

### **Environment Strategy**
- **Development**: Local Docker Compose
- **Staging**: Single-node Kubernetes cluster
- **Production**: Multi-node Kubernetes cluster with HA
- **DR (Disaster Recovery)**: Cross-region backup cluster

---

## 📋 **Project Milestones**

### **Milestone 1: MVP (Week 12)**
- ✅ Basic aid request creation and viewing
- ✅ Simple donor registration and donation
- ✅ Volunteer registration and basic task assignment
- ✅ Email notifications
- ✅ Admin dashboard with basic analytics

### **Milestone 2: Enhanced Features (Week 16)**
- ✅ Real-time updates via WebSocket
- ✅ Advanced resource matching algorithm
- ✅ SMS notifications
- ✅ Mobile-responsive frontend
- ✅ Geolocation services

### **Milestone 3: Production Ready (Week 20)**
- ✅ Full authentication and authorization
- ✅ Comprehensive monitoring and logging
- ✅ Load testing and performance optimization
- ✅ Security audit and penetration testing
- ✅ Documentation and user guides

### **Milestone 4: Launch (Week 24)**
- ✅ Production deployment
- ✅ User acceptance testing
- ✅ Performance monitoring setup
- ✅ Go-live support and monitoring
- ✅ Initial user onboarding

---

## 🎯 **Success Criteria**

### **Technical KPIs**
- **Availability**: 99.9% uptime
- **Performance**: <200ms API response time
- **Scalability**: Support 10,000+ concurrent users
- **Security**: Zero critical security vulnerabilities
- **Test Coverage**: >80% code coverage

### **Business KPIs**
- **User Adoption**: 1,000+ registered users in first month
- **Aid Request Fulfillment**: >80% fulfillment rate
- **Response Time**: <1 hour average response to urgent requests
- **User Satisfaction**: >4.5/5.0 rating
- **Platform Growth**: 20% month-over-month user growth

---

This comprehensive project plan provides a structured approach to building the SmartRelief platform using modern cloud-native technologies and best practices. The phased approach ensures steady progress while maintaining quality and security standards throughout the development lifecycle.