import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

const router = new Hono();

// In-memory user storage (replace with database in production)
const users: any[] = [];

// Create user profile
const createUserSchema = z.object({
  name: z.string().min(1),
  age: z.number().min(6).max(12),
  grade: z.number().min(1).max(6),
  favoriteSubject: z.string().optional(),
});

router.post('/', zValidator('json', createUserSchema), async (c) => {
  const data = c.req.valid('json');

  const user = {
    id: Date.now().toString(),
    ...data,
    createdAt: new Date().toISOString(),
    progress: {},
  };

  users.push(user);

  return c.json({ user }, 201);
});

// Get all users (admin only)
router.get('/', (c) => {
  return c.json({ users });
});

// Get user by ID
router.get('/:id', (c) => {
  const id = c.req.param('id');
  const user = users.find(u => u.id === id);

  if (!user) {
    return c.json({ error: 'User not found' }, 404);
  }

  return c.json({ user });
});

// Update user profile
router.put('/:id', zValidator('json', createUserSchema.partial()), async (c) => {
  const id = c.req.param('id');
  const updates = c.req.valid('json');

  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    return c.json({ error: 'User not found' }, 404);
  }

  users[userIndex] = { ...users[userIndex], ...updates };

  return c.json({ user: users[userIndex] });
});

export default router;
