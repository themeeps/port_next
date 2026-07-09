'use client';

import { useActionState } from 'react';
import { authenticate } from './actions';

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="email" className="block font-semibold text-white mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="admin@example.com"
          className="form-control w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none"
        />
      </div>

      <div>
        <label htmlFor="password" className="block font-semibold text-white mb-2">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          placeholder="••••••••"
          className="form-control w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none"
        />
      </div>

      {errorMessage && <p className="text-sm text-red-400 font-medium">{errorMessage}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="btn-gradient w-full text-white font-semibold px-6 py-3 rounded-lg disabled:opacity-60"
      >
        {isPending ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}
