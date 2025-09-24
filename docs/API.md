# Hay School API Documentation

## Overview

The Hay School API is built with Hono and deployed on Cloudflare Workers. It provides RESTful endpoints for managing educational content, user progress, and platform features.

**Base URL**: `https://your-worker.hay-school.workers.dev`

## Authentication

Currently, the API is open for development. In production, implement authentication headers:

```
Authorization: Bearer <token>
Content-Type: application/json
```

## Response Format

All responses follow this structure:

```json
{
  "success": boolean,
  "data": object | array | null,
  "error": string | null,
  "message": string | null
}
```

## Endpoints

## 🏫 Subjects API

### Get All Subjects
```http
GET /api/subjects
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "math",
      "name": "Mathématiques",
      "description": "Maîtrisez les nombres, les calculs et la géométrie",
      "icon": "🔢",
      "color": "bg-blue-500",
      "totalLessons": 24,
      "modules": [...]
    }
  ],
  "total": 6
}
```

### Get Subject by ID
```http
GET /api/subjects/{id}
```

**Parameters:**
- `id` (string): Subject ID (math, francais, sciences, histoire, geographie, anglais)

### Get Subject Modules
```http
GET /api/subjects/{id}/modules
```

### Get Specific Module
```http
GET /api/subjects/{id}/modules/{moduleId}
```

## 👤 Users API

### Create User Profile
```http
POST /api/users
```

**Request Body:**
```json
{
  "name": "Marie Dupont",
  "age": 8,
  "grade": 3,
  "favoriteSubject": "math",
  "learningStyle": "visual"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_1234567890_abc123def",
    "name": "Marie Dupont",
    "age": 8,
    "grade": 3,
    "favoriteSubject": "math",
    "learningStyle": "visual",
    "progress": {
      "totalLessonsCompleted": 0,
      "subjectsProgress": {},
      "achievements": [],
      "currentStreak": 0,
      "bestStreak": 0
    },
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Get User by ID
```http
GET /api/users/{id}
```

### Update User Profile
```http
PUT /api/users/{id}
```

**Request Body:** (partial update supported)
```json
{
  "name": "Marie Dupont",
  "favoriteSubject": "francais"
}
```

### Update User Progress
```http
POST /api/users/{id}/progress
```

**Request Body:**
```json
{
  "subjectId": "math",
  "lessonId": 1,
  "completed": true,
  "score": 85,
  "timeSpent": 15
}
```

### Get User Progress
```http
GET /api/users/{id}/progress
```

## 📊 Progress API

### Get User Progress
```http
GET /api/progress/user/{userId}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "records": [...],
    "stats": {
      "totalCompleted": 15,
      "totalLessons": 24,
      "averageScore": 82.5,
      "totalTimeSpent": 180,
      "subjectBreakdown": [...]
    }
  }
}
```

### Get Subject Progress
```http
GET /api/progress/user/{userId}/subject/{subjectId}
```

### Record Progress
```http
POST /api/progress
```

**Request Body:**
```json
{
  "userId": "user_123",
  "subjectId": "math",
  "lessonId": 1,
  "completed": true,
  "score": 90,
  "timeSpent": 12
}
```

### Get Global Statistics
```http
GET /api/progress/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalUsers": 150,
    "totalRecords": 2400,
    "completedLessons": 1800,
    "averageScore": 78.5,
    "totalTimeSpent": 28800,
    "subjectStats": {
      "math": {
        "users": 120,
        "completedLessons": 450,
        "averageScore": 82.3
      }
    }
  }
}
```

## 📬 Contact API

### Submit Contact Form
```http
POST /api/contact
```

**Request Body:**
```json
{
  "name": "Jean Parent",
  "email": "jean.parent@email.com",
  "subject": "Question sur les mathématiques",
  "message": "Mon enfant a du mal avec les fractions...",
  "userId": "user_123" // optional
}
```

### Get Contact Statistics
```http
GET /api/contact/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 45,
    "pending": 12,
    "responded": 28,
    "closed": 5,
    "averageResponseTime": 24,
    "recentMessages": 8
  }
}
```

## 🔧 System Endpoints

### Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "service": "hay-school-backend"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Validation Error",
  "message": "Invalid email format"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Not Found",
  "message": "Subject not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Internal Server Error",
  "message": "Something went wrong on our end"
}
```

## Rate Limiting

- **Requests per minute**: 100
- **Burst limit**: 20 requests per 10 seconds
- Applied to all endpoints

## Data Types

### Subject
```typescript
interface Subject {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  totalLessons: number;
  modules: Module[];
}
```

### User
```typescript
interface User {
  id: string;
  name: string;
  age: number;
  grade: number;
  favoriteSubject: string;
  learningStyle: 'visual' | 'auditory' | 'kinesthetic';
  avatar?: string;
  progress: UserProgress;
  createdAt: string;
  updatedAt: string;
}
```

### Progress Record
```typescript
interface ProgressRecord {
  id: string;
  userId: string;
  subjectId: string;
  lessonId: number;
  completed: boolean;
  score?: number;
  timeSpent: number;
  completedAt?: string;
  createdAt: string;
}
```

## SDK Usage

### JavaScript/TypeScript Client

```javascript
// Initialize client
const apiClient = {
  baseURL: 'https://your-worker.hay-school.workers.dev',

  async request(endpoint, options = {}) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    return response.json();
  }
};

// Usage examples
const subjects = await apiClient.request('/api/subjects');
const user = await apiClient.request('/api/users/user_123');
```

### React Query Integration

```typescript
import { useQuery, useMutation } from '@tanstack/react-query';

function useSubjects() {
  return useQuery({
    queryKey: ['subjects'],
    queryFn: () => apiClient.request('/api/subjects')
  });
}

function useCreateUser() {
  return useMutation({
    mutationFn: (userData) =>
      apiClient.request('/api/users', {
        method: 'POST',
        body: JSON.stringify(userData)
      })
  });
}
```

## Deployment

The API is deployed as a Cloudflare Worker:

1. **Install Wrangler**: `npm install -g wrangler`
2. **Login**: `wrangler auth login`
3. **Deploy**: `npm run deploy`

## Monitoring

### Logs
- Cloudflare Workers logs available in dashboard
- Request/response logging enabled
- Error tracking with stack traces

### Metrics
- Response times
- Error rates
- Request volumes
- Geographic distribution

## Future Enhancements

- [ ] Authentication & authorization
- [ ] Rate limiting per user
- [ ] Caching with Cloudflare KV
- [ ] Database integration (D1)
- [ ] File storage (R2)
- [ ] WebSocket support
- [ ] GraphQL API
- [ ] API versioning
