import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import LoginForm from './LoginForm';

export default function LoginPage() {
  return (
    <main className="login-page min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="social-icon no-underline inline-flex items-center gap-1.5 text-sm font-medium mb-4"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <div className="login-card bg-slate-900/60 backdrop-blur-md border border-white/10 p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="login-logo rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
              PM
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Login</h1>
            <p className="text-slate-400 text-sm mt-1">Sign in to manage your portfolio</p>
          </div>

          <LoginForm />
        </div>
      </div>
    </main>
  );
}
