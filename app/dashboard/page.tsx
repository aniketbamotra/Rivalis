'use client';

import { Suspense } from 'react';
import { UserDashboard } from '@/page-components/Dashboard/UserDashboard';
export const dynamic = 'force-dynamic';
export default function Dashboard() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserDashboard />
    </Suspense>
  );
}
