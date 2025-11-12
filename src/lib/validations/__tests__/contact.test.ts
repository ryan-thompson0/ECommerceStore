import { describe, it, expect } from 'vitest';
import { contactFormSchema } from '../contact';

describe('contact form validation', () => {
  it('accepts valid data', () => {
    const result = contactFormSchema.safeParse({
      name: 'Alice Johnson',
      email: 'ALICE@EXAMPLE.COM',
      subject: 'Order question',
      message: 'Hello, I have a quick question about my order.',
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe('alice@example.com');
    }
  });

  it('rejects names that are too short', () => {
    const result = contactFormSchema.safeParse({
      name: 'A',
      email: 'test@example.com',
      subject: 'Help',
      message: 'This message is long enough.',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const messages = result.error.issues.map((issue) => issue.message);
      expect(messages).toContain('Name must be at least 2 characters');
    }
  });

  it('rejects invalid email', () => {
    const result = contactFormSchema.safeParse({
      name: 'Test User',
      email: 'not-an-email',
      subject: 'Subject',
      message: 'Valid message text.',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const messages = result.error.issues.map((issue) => issue.message);
      expect(messages).toContain('Please enter a valid email address');
    }
  });
});
