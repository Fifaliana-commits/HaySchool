import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

const router = new Hono();

// In-memory progress storage (replace with database in production)
const progressData: any[] = [];

// Update progress
const updateProgressSchema = z.object({
  userId: z.string(),
  subjectId: z.string(),
  moduleId: z.string(),
  score: z.number().min(0).max(100),
  completed: z.boolean(),
});

router.post('/', zValidator('json', updateProgressSchema), async (c) => {
  const data = c.req.valid('json');

  const progress = {
    id: Date.now().toString(),
    ...data,
    timestamp: new Date().toISOString(),
  };

  progressData.push(progress);

  return c.json({ progress }, 201);
});

// Get user progress
router.get('/user/:userId', (c) => {
  const userId = c.req.param('userId');
  const userProgress = progressData.filter(p => p.userId === userId);

  return c.json({ progress: userProgress });
});

// Get progress statistics
router.get('/stats', (c) => {
  const totalUsers = new Set(progressData.map(p => p.userId)).size;
  const totalCompletions = progressData.filter(p => p.completed).length;
  const averageScore = progressData.length > 0
    ? progressData.reduce((sum, p) => sum + p.score, 0) / progressData.length
    : 0;

  return c.json({
    stats: {
      totalUsers,
      totalCompletions,
      averageScore: Math.round(averageScore),
      totalProgress: progressData.length,
    }
  });
});

export default router;
