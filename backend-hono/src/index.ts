import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

// Routes
import { subjectsRoute } from './routes/subjects';
import { usersRoute } from './routes/users';
import { progressRoute } from './routes/progress';
import { contactRoute } from './routes/contact';

type Bindings = {
  // Add your Cloudflare bindings here
  // DATABASE_URL: string;
  // JWT_SECRET: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// Middleware
app.use('*', cors({
  origin: ['http://localhost:5173', 'https://hay-school.pages.dev'],
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

app.use('*', logger());

// Health check endpoint
app.get('/api/health', (c) => {
  return c.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'hay-school-backend'
  });
});

// API routes
app.route('/api/subjects', subjectsRoute);
app.route('/api/users', usersRoute);
app.route('/api/progress', progressRoute);
app.route('/api/contact', contactRoute);

// 404 handler
app.notFound((c) => {
  return c.json({
    error: 'Not Found',
    message: 'The requested resource was not found'
  }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error(`${err}`);
  return c.json({
    error: 'Internal Server Error',
    message: 'Something went wrong on our end'
  }, 500);
});

export default app;
