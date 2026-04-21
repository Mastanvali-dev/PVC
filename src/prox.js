import { NextResponse } from 'next/server';
import { authConfig } from '../auth.config';
import type { NextRequest } from 'next/server';

export default authConfig.authorized({
  pages: authConfig.pages,
}).authorize((url, token) => {
  // Custom logic if needed
  const isLoggedIn = !!token;
  const isOnAdminPage = url.pathname.startsWith('/admin');
  
  if (isOnAdminPage) {
    if (isLoggedIn) return null;
    return `/admin/login?callbackUrl=${encodeURI(url.pathname)}`;
  } 
  return null;
}).middleware();

export const config = {
  matcher: ['/admin/:path*']
};
