/**
 * Order success page
 */

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Container } from '@/components/layout';
import { Button } from '@/components/ui';

export default function OrderSuccessPage() {
  return (
    <Container className="py-12">
      <div className="max-w-2xl mx-auto text-center">
        <CheckCircle className="h-24 w-24 text-green-600 mx-auto mb-6" />

        <h1 className="text-4xl font-bold mb-4">Order Placed Successfully!</h1>

        <p className="text-gray-600 text-lg mb-8">
          Thank you for your purchase. Your order has been received and is being processed.
          You will receive a confirmation email shortly.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="font-semibold text-lg mb-2">What's Next?</h2>
          <ul className="text-left text-gray-700 space-y-2">
            <li>• You'll receive an order confirmation email</li>
            <li>• We'll send you shipping updates as your order progresses</li>
            <li>• Your items will arrive within 5-7 business days</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
