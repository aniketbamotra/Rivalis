'use client';

import { Suspense } from 'react';
import { LoginPage } from '@/page-components/Auth/LoginPage';

export const dynamic = 'force-dynamic';

function LoginPageContent() {
  return <LoginPage />;
}

export default function Login() {
  return (
    <Suspense fallback={
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        fontSize: '1.2rem',
        color: '#666'
      }}>
        Loading...
      </div>
    }>
      <LoginPageContent />
    </Suspense>
  );
}
