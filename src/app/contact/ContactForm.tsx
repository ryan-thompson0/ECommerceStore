/**
 * Contact form component with Zod validation
 */

'use client';

import { useState } from 'react';
import { ZodError } from 'zod';
import { Button } from '@/components/ui';
import { Send, Check } from 'lucide-react';
import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact';

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      // Validate form data with Zod
      contactFormSchema.parse(formData);

      // In a real app, this would send data to an API
      // For production, integrate with error logging service (e.g., Sentry, LogRocket)
      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      if (error instanceof ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          const field = issue.path[0] as string;
          newErrors[field] = issue.message;
        });
        setErrors(newErrors);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="glass-card p-8 rounded-xl shadow-glow border-2 border-primary/10">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Send us a Message
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-foreground mb-2 uppercase tracking-wide">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-foreground transition-all duration-300 ${
              errors.name ? 'border-red-500' : 'border-border'
            }`}
            placeholder="Your name"
          />
          {errors.name && (
            <p id="name-error" className="text-red-500 text-sm mt-1" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-foreground mb-2 uppercase tracking-wide">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-foreground transition-all duration-300 ${
              errors.email ? 'border-red-500' : 'border-border'
            }`}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="subject" className="block text-sm font-bold text-foreground mb-2 uppercase tracking-wide">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-foreground transition-all duration-300 ${
              errors.subject ? 'border-red-500' : 'border-border'
            }`}
            placeholder="How can we help?"
          />
          {errors.subject && (
            <p id="subject-error" className="text-red-500 text-sm mt-1" role="alert">
              {errors.subject}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-bold text-foreground mb-2 uppercase tracking-wide">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-foreground transition-all duration-300 resize-none ${
              errors.message ? 'border-red-500' : 'border-border'
            }`}
            placeholder="Tell us more about your inquiry..."
          />
          {errors.message && (
            <p id="message-error" className="text-red-500 text-sm mt-1" role="alert">
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitted}
          className="w-full flex items-center justify-center space-x-2 bg-gradient-primary hover:shadow-glow-lg hover:scale-105 transition-all duration-300 border-0 shadow-colored"
        >
          {isSubmitted ? (
            <>
              <Check className="h-5 w-5" />
              <span className="font-semibold">Message Sent!</span>
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              <span className="font-semibold">Send Message</span>
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
