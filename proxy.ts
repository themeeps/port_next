import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export const { auth: proxy } = NextAuth(authConfig);

export const config = {
  matcher: [
    {
      source: '/admin/:path*',
      // Server Actions POST back to the page they're called from, so they'd
      // otherwise be re-intercepted by this same proxy. Skip it for those
      // requests (identified by the `next-action` header) and rely on the
      // `auth()` check in admin/layout.tsx + each action instead.
      missing: [{ type: 'header', key: 'next-action' }],
    },
  ],
};
