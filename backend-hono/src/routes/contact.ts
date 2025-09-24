import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

const router = new Hono();

// In-memory contact storage (replace with database in production)
const contacts: any[] = [];

// Submit contact form
const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(10),
});

router.post('/', zValidator('json', contactSchema), async (c) => {
  const data = c.req.valid('json');

  const contact = {
    id: Date.now().toString(),
    ...data,
    submittedAt: new Date().toISOString(),
    status: 'pending',
  };

  contacts.push(contact);

  return c.json({
    message: 'Message sent successfully',
    contact: { id: contact.id, status: contact.status }
  }, 201);
});

// Get all messages (admin only)
router.get('/', (c) => {
  return c.json({ contacts });
});

// Get contact statistics
router.get('/stats', (c) => {
  const total = contacts.length;
  const pending = contacts.filter(c => c.status === 'pending').length;
  const resolved = contacts.filter(c => c.status === 'resolved').length;

  return c.json({
    stats: {
      total,
      pending,
      resolved,
      responseRate: total > 0 ? Math.round((resolved / total) * 100) : 0,
    }
  });
});

export default router;
