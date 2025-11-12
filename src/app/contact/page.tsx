/**
 * Contact page - Contact form and information
 */

import { Container } from '@/components/layout';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { ContactForm } from './ContactForm';

export default function ContactPage() {
  return (
    <Container className="py-12">
      {/* Hero Section */}
      <div className="text-center mb-16 animate-scale-in">
        <h1 className="text-5xl font-black text-foreground mb-4">
          Get in <span className="gradient-text">Touch</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Have a question or need assistance? We're here to help! Reach out to us and we'll get back to you as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="animate-slide-up">
          <ContactForm />
        </div>

        {/* Contact Information */}
        <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="glass-card p-8 rounded-xl shadow-glow border-2 border-primary/10">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Contact Information
            </h2>
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-gradient-primary">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Email</h3>
                  <a
                    href="mailto:support@shophub.com"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    support@shophub.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-gradient-cosmic">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Phone</h3>
                  <a
                    href="tel:+15551234567"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    +1 (555) 123-4567
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-gradient-accent">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Address</h3>
                  <p className="text-muted-foreground">
                    123 Shopping Street<br />
                    San Francisco, CA 94102<br />
                    United States
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-gradient-secondary">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Business Hours</h3>
                  <p className="text-muted-foreground">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="glass-card p-8 rounded-xl shadow-glow border-2 border-primary/10">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Quick Answers
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-foreground mb-2">
                  What are your shipping times?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Standard shipping typically takes 3-5 business days. Express shipping is available for 1-2 day delivery.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">
                  What is your return policy?
                </h3>
                <p className="text-muted-foreground text-sm">
                  We offer a 30-day return policy on most items. Products must be unused and in original packaging.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">
                  Do you ship internationally?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Yes! We ship to most countries worldwide. International shipping times vary by location.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
