'use client';

import { Suspense } from 'react';
import { PaymentSuccess } from '@/page-components/PaymentSuccess';

// This page uses searchParams and should not be prerendered
export const dynamic = 'force-dynamic';

function PaymentSuccessContent() {
  return <PaymentSuccess />;
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
