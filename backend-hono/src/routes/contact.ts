import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(5).max(200),
  message: z.string().min(10).max(1000),
  userId: z.string().optional(), // For authenticated users
});

// Types
interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  userId?: string;
  status: 'pending' | 'responded' | 'closed';
  createdAt: string;
  respondedAt?: string;
}

// In-memory storage (in production, use a database or email service)
const contactMessages: Map<string, ContactMessage> = new Map();

const contactRoute = new Hono();

// POST /api/contact - Submit contact form
contactRoute.post('/', zValidator('json', contactSchema), async (c) => {
  const body = c.req.valid('json');

  const messageId = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const contactMessage: ContactMessage = {
    id: messageId,
    name: body.name,
    email: body.email,
    subject: body.subject,
    message: body.message,
    userId: body.userId,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  // Store the message
  contactMessages.set(messageId, contactMessage);

  // In a real application, you would:
  // 1. Send an email notification to administrators
  // 2. Store in a database
  // 3. Send confirmation email to user
  // 4. Integrate with a CRM system

  console.log('New contact message received:', {
    id: messageId,
    name: body.name,
    email: body.email,
    subject: body.subject,
    messageLength: body.message.length
  });

  return c.json({
    success: true,
    data: {
      id: messageId,
      status: 'received'
    },
    message: 'Thank you for your message. We will get back to you soon!'
  }, 201);
});

// GET /api/contact - Get all contact messages (admin only)
contactRoute.get('/', (c) => {
  // In production, add authentication check for admin access
  const messages = Array.from(contactMessages.values())
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return c.json({
    success: true,
    data: messages,
    total: messages.length
  });
});

// GET /api/contact/stats - Get contact statistics
contactRoute.get('/stats', (c) => {
  const messages = Array.from(contactMessages.values());

  const stats = {
    total: messages.length,
    pending: messages.filter(m => m.status === 'pending').length,
    responded: messages.filter(m => m.status === 'responded').length,
    closed: messages.filter(m => m.status === 'closed').length,
    averageResponseTime: calculateAverageResponseTime(messages),
    recentMessages: messages
      .filter(m => {
        const messageDate = new Date(m.createdAt);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return messageDate > weekAgo;
      })
      .length
  };

  return c.json({
    success: true,
    data: stats
  });
});

// PUT /api/contact/:id/status - Update message status (admin only)
contactRoute.put('/:id/status', zValidator('json', z.object({
  status: z.enum(['pending', 'responded', 'closed'])
})), async (c) => {
  const messageId = c.req.param('id');
  const { status } = c.req.valid('json');

  const message = contactMessages.get(messageId);
  if (!message) {
    return c.json({
      success: false,
      error: 'Contact message not found'
    }, 404);
  }

  message.status = status;
  if (status === 'responded' && !message.respondedAt) {
    message.respondedAt = new Date().toISOString();
  }

  return c.json({
    success: true,
    data: message,
    message: 'Message status updated successfully'
  });
});

// DELETE /api/contact/:id - Delete message (admin only)
contactRoute.delete('/:id', (c) => {
  const messageId = c.req.param('id');
  const deleted = contactMessages.delete(messageId);

  if (!deleted) {
    return c.json({
      success: false,
      error: 'Contact message not found'
    }, 404);
  }

  return c.json({
    success: true,
    message: 'Contact message deleted successfully'
  });
});

// Helper function to calculate average response time
function calculateAverageResponseTime(messages: ContactMessage[]): number {
  const respondedMessages = messages.filter(m =>
    m.status === 'responded' && m.respondedAt
  );

  if (respondedMessages.length === 0) return 0;

  const totalResponseTime = respondedMessages.reduce((sum, message) => {
    const created = new Date(message.createdAt).getTime();
    const responded = new Date(message.respondedAt!).getTime();
    return sum + (responded - created);
  }, 0);

  // Return average in hours
  return Math.round((totalResponseTime / respondedMessages.length) / (1000 * 60 * 60));
}

export { contactRoute };
