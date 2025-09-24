import { describe, it, expect } from 'vitest';
import app from '../index';

describe('Health Check API', () => {
  it('should return healthy status', async () => {
    const res = await app.request('/api/health');
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual({
      status: 'healthy',
      timestamp: expect.any(String),
      service: 'hay-school-backend'
    });
  });
});
