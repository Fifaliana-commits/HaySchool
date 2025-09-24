import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

// Routes
import subjects from './routes/subjects';
import users from './routes/users';
import progress from './routes/progress';
import contact from './routes/contact';

type Bindings = {
  NODE_ENV: string;
  ALLOWED_ORIGINS: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// Middleware
app.use('*', cors({
  origin: (origin) => {
    const allowedOrigins = app.env?.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'];
    return allowedOrigins.includes(origin) || false;
  },
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

app.use('*', logger());

// Health check
app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.route('/api/subjects', subjects);
app.route('/api/users', users);
app.route('/api/progress', progress);
app.route('/api/contact', contact);

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Not Found', status: 404 }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error(`${err}`);
  return c.json({ error: 'Internal Server Error', status: 500 }, 500);
});

export default app;
