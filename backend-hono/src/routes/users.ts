import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

// Validation schemas
const createUserSchema = z.object({
  name: z.string().min(2).max(50),
  age: z.number().min(6).max(12),
  grade: z.number().min(1).max(6),
  favoriteSubject: z.enum(['math', 'francais', 'sciences', 'histoire', 'geographie', 'anglais']),
  learningStyle: z.enum(['visual', 'auditory', 'kinesthetic']),
});

const updateProgressSchema = z.object({
  subjectId: z.string(),
  lessonId: z.number(),
  completed: z.boolean(),
  score: z.number().min(0).max(100).optional(),
});

// Types
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

interface UserProgress {
  totalLessonsCompleted: number;
  subjectsProgress: Record<string, SubjectProgress>;
  achievements: string[];
  currentStreak: number;
  bestStreak: number;
}

interface SubjectProgress {
  completedLessons: number;
  totalLessons: number;
  averageScore: number;
  lastActivity: string;
}

// In-memory storage (in production, use a database)
const users: Map<string, User> = new Map();

const usersRoute = new Hono();

// GET /api/users - Get all users (admin only)
usersRoute.get('/', (c) => {
  const allUsers = Array.from(users.values());
  return c.json({
    success: true,
    data: allUsers,
    total: allUsers.length
  });
});

// POST /api/users - Create new user profile
usersRoute.post('/', zValidator('json', createUserSchema), async (c) => {
  const body = c.req.valid('json');

  const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const newUser: User = {
    id: userId,
    name: body.name,
    age: body.age,
    grade: body.grade,
    favoriteSubject: body.favoriteSubject,
    learningStyle: body.learningStyle,
    progress: {
      totalLessonsCompleted: 0,
      subjectsProgress: {},
      achievements: [],
      currentStreak: 0,
      bestStreak: 0
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  users.set(userId, newUser);

  return c.json({
    success: true,
    data: newUser,
    message: 'User profile created successfully'
  }, 201);
});

// GET /api/users/:id - Get user by ID
usersRoute.get('/:id', (c) => {
  const userId = c.req.param('id');
  const user = users.get(userId);

  if (!user) {
    return c.json({
      success: false,
      error: 'User not found'
    }, 404);
  }

  return c.json({
    success: true,
    data: user
  });
});

// PUT /api/users/:id - Update user profile
usersRoute.put('/:id', zValidator('json', createUserSchema.partial()), async (c) => {
  const userId = c.req.param('id');
  const updates = c.req.valid('json');

  const user = users.get(userId);
  if (!user) {
    return c.json({
      success: false,
      error: 'User not found'
    }, 404);
  }

  const updatedUser: User = {
    ...user,
    ...updates,
    updatedAt: new Date().toISOString()
  };

  users.set(userId, updatedUser);

  return c.json({
    success: true,
    data: updatedUser,
    message: 'User profile updated successfully'
  });
});

// POST /api/users/:id/progress - Update user progress
usersRoute.post('/:id/progress', zValidator('json', updateProgressSchema), async (c) => {
  const userId = c.req.param('id');
  const progressUpdate = c.req.valid('json');

  const user = users.get(userId);
  if (!user) {
    return c.json({
      success: false,
      error: 'User not found'
    }, 404);
  }

  // Initialize subject progress if it doesn't exist
  if (!user.progress.subjectsProgress[progressUpdate.subjectId]) {
    user.progress.subjectsProgress[progressUpdate.subjectId] = {
      completedLessons: 0,
      totalLessons: 24, // This should come from subject data
      averageScore: 0,
      lastActivity: new Date().toISOString()
    };
  }

  const subjectProgress = user.progress.subjectsProgress[progressUpdate.subjectId];

  if (progressUpdate.completed) {
    subjectProgress.completedLessons += 1;
    user.progress.totalLessonsCompleted += 1;

    if (progressUpdate.score) {
      // Update average score
      const currentTotal = subjectProgress.averageScore * (subjectProgress.completedLessons - 1);
      subjectProgress.averageScore = (currentTotal + progressUpdate.score) / subjectProgress.completedLessons;
    }

    // Update streak
    user.progress.currentStreak += 1;
    if (user.progress.currentStreak > user.progress.bestStreak) {
      user.progress.bestStreak = user.progress.currentStreak;
    }

    // Check for achievements
    if (subjectProgress.completedLessons === 5) {
      user.progress.achievements.push('first-steps');
    }
    if (user.progress.currentStreak === 7) {
      user.progress.achievements.push('week-streak');
    }
  }

  subjectProgress.lastActivity = new Date().toISOString();
  user.updatedAt = new Date().toISOString();

  return c.json({
    success: true,
    data: {
      progress: user.progress,
      message: 'Progress updated successfully'
    }
  });
});

// GET /api/users/:id/progress - Get user progress
usersRoute.get('/:id/progress', (c) => {
  const userId = c.req.param('id');
  const user = users.get(userId);

  if (!user) {
    return c.json({
      success: false,
      error: 'User not found'
    }, 404);
  }

  return c.json({
    success: true,
    data: user.progress
  });
});

// DELETE /api/users/:id - Delete user (for testing/admin purposes)
usersRoute.delete('/:id', (c) => {
  const userId = c.req.param('id');
  const deleted = users.delete(userId);

  if (!deleted) {
    return c.json({
      success: false,
      error: 'User not found'
    }, 404);
  }

  return c.json({
    success: true,
    message: 'User deleted successfully'
  });
});

export { usersRoute };
