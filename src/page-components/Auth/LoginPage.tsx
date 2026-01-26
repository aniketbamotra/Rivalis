import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';
import { MainLayout } from '../../components/Layout';
import './auth.css';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  const { signIn, user, loading: authLoading, isAdmin } = useAuth();
  const router = useRouter();
  
  // Get the intended destination - will come from session storage in Next.js
  const from = typeof window !== 'undefined' ? sessionStorage.getItem('redirectAfterLogin') : null;

  // Redirect if logged in and auth is not loading
  useEffect(() => {
    if (!authLoading && user) {
      // Determine where to redirect
      let destination = '/dashboard';
      if (from) {
        destination = from;
      } else if (isAdmin) {
        destination = '/admin';
      }
      router.push(destination);
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('redirectAfterLogin');
      }
    }
  }, [user, authLoading, isAdmin, router, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const { error: signInError } = await signIn(email, password);
      if (signInError) {
        setError(signInError.message);
        setSubmitting(false);
      }
      // Navigation happens via useEffect when user state updates
    } catch {
      setError('An unexpected error occurred');
      setSubmitting(false);
    }
  };

  // Show loading while auth is initializing
  if (authLoading) {
    return (
      <MainLayout>
        <div className="auth-page">
          <div className="auth-container">
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p>Loading...</p>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-header">
            <h1>Welcome Back</h1>
            <p>Sign in to access your dashboard</p>
          </div>

          {error && (
            <div className="auth-error">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="form-actions">
              <Link href="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="auth-button" disabled={submitting}>
              {submitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <Link href="/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
