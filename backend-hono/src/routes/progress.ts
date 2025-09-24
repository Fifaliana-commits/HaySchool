import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

// Types
interface ProgressRecord {
  id: string;
  userId: string;
  subjectId: string;
  lessonId: number;
  completed: boolean;
  score?: number;
  timeSpent: number; // in minutes
  completedAt?: string;
  createdAt: string;
}

// In-memory storage (in production, use a database)
const progressRecords: Map<string, ProgressRecord> = new Map();

const progressRoute = new Hono();

// GET /api/progress - Get all progress records (admin only)
progressRoute.get('/', (c) => {
  const records = Array.from(progressRecords.values());
  return c.json({
    success: true,
    data: records,
    total: records.length
  });
});

// GET /api/progress/user/:userId - Get progress for a specific user
progressRoute.get('/user/:userId', (c) => {
  const userId = c.req.param('userId');
  const userRecords = Array.from(progressRecords.values())
    .filter(record => record.userId === userId);

  // Group by subject
  const bySubject = userRecords.reduce((acc, record) => {
    if (!acc[record.subjectId]) {
      acc[record.subjectId] = [];
    }
    acc[record.subjectId].push(record);
    return acc;
  }, {} as Record<string, ProgressRecord[]>);

  // Calculate statistics
  const stats = {
    totalCompleted: userRecords.filter(r => r.completed).length,
    totalLessons: userRecords.length,
    averageScore: userRecords
      .filter(r => r.score !== undefined)
      .reduce((sum, r) => sum + (r.score || 0), 0) /
      userRecords.filter(r => r.score !== undefined).length || 0,
    totalTimeSpent: userRecords.reduce((sum, r) => sum + r.timeSpent, 0),
    subjectBreakdown: Object.entries(bySubject).map(([subjectId, records]) => ({
      subjectId,
      completed: records.filter(r => r.completed).length,
      total: records.length,
      averageScore: records
        .filter(r => r.score !== undefined)
        .reduce((sum, r) => sum + (r.score || 0), 0) /
        records.filter(r => r.score !== undefined).length || 0,
      timeSpent: records.reduce((sum, r) => sum + r.timeSpent, 0)
    }))
  };

  return c.json({
    success: true,
    data: {
      records: userRecords,
      stats
    }
  });
});

// GET /api/progress/user/:userId/subject/:subjectId - Get progress for specific subject
progressRoute.get('/user/:userId/subject/:subjectId', (c) => {
  const userId = c.req.param('userId');
  const subjectId = c.req.param('subjectId');

  const subjectRecords = Array.from(progressRecords.values())
    .filter(record => record.userId === userId && record.subjectId === subjectId);

  const stats = {
    completed: subjectRecords.filter(r => r.completed).length,
    total: subjectRecords.length,
    averageScore: subjectRecords
      .filter(r => r.score !== undefined)
      .reduce((sum, r) => sum + (r.score || 0), 0) /
      subjectRecords.filter(r => r.score !== undefined).length || 0,
    totalTimeSpent: subjectRecords.reduce((sum, r) => sum + r.timeSpent, 0),
    completionRate: subjectRecords.length > 0
      ? (subjectRecords.filter(r => r.completed).length / subjectRecords.length) * 100
      : 0
  };

  return c.json({
    success: true,
    data: {
      records: subjectRecords,
      stats
    }
  });
});

// POST /api/progress - Create/update progress record
progressRoute.post('/', zValidator('json', z.object({
  userId: z.string(),
  subjectId: z.string(),
  lessonId: z.number(),
  completed: z.boolean(),
  score: z.number().min(0).max(100).optional(),
  timeSpent: z.number().min(0)
})), async (c) => {
  const body = c.req.valid('json');

  const recordId = `${body.userId}_${body.subjectId}_${body.lessonId}`;
  const existingRecord = progressRecords.get(recordId);

  const record: ProgressRecord = {
    id: recordId,
    userId: body.userId,
    subjectId: body.subjectId,
    lessonId: body.lessonId,
    completed: body.completed,
    score: body.score,
    timeSpent: body.timeSpent,
    completedAt: body.completed ? new Date().toISOString() : undefined,
    createdAt: existingRecord?.createdAt || new Date().toISOString()
  };

  progressRecords.set(recordId, record);

  return c.json({
    success: true,
    data: record,
    message: existingRecord ? 'Progress updated' : 'Progress recorded'
  });
});

// DELETE /api/progress/:id - Delete progress record
progressRoute.delete('/:id', (c) => {
  const id = c.req.param('id');
  const deleted = progressRecords.delete(id);

  if (!deleted) {
    return c.json({
      success: false,
      error: 'Progress record not found'
    }, 404);
  }

  return c.json({
    success: true,
    message: 'Progress record deleted successfully'
  });
});

// GET /api/progress/stats - Get global statistics
progressRoute.get('/stats', (c) => {
  const allRecords = Array.from(progressRecords.values());

  const stats = {
    totalUsers: new Set(allRecords.map(r => r.userId)).size,
    totalRecords: allRecords.length,
    completedLessons: allRecords.filter(r => r.completed).length,
    averageScore: allRecords
      .filter(r => r.score !== undefined)
      .reduce((sum, r) => sum + (r.score || 0), 0) /
      allRecords.filter(r => r.score !== undefined).length || 0,
    totalTimeSpent: allRecords.reduce((sum, r) => sum + r.timeSpent, 0),
    subjectStats: {} as Record<string, {
      users: number;
      completedLessons: number;
      averageScore: number;
    }>
  };

  // Calculate per-subject stats
  const bySubject = allRecords.reduce((acc, record) => {
    if (!acc[record.subjectId]) {
      acc[record.subjectId] = [];
    }
    acc[record.subjectId].push(record);
    return acc;
  }, {} as Record<string, ProgressRecord[]>);

  Object.entries(bySubject).forEach(([subjectId, records]) => {
    stats.subjectStats[subjectId] = {
      users: new Set(records.map(r => r.userId)).size,
      completedLessons: records.filter(r => r.completed).length,
      averageScore: records
        .filter(r => r.score !== undefined)
        .reduce((sum, r) => sum + (r.score || 0), 0) /
        records.filter(r => r.score !== undefined).length || 0
    };
  });

  return c.json({
    success: true,
    data: stats
  });
});

export { progressRoute };
