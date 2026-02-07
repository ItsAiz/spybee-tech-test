import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/shared/domain/utils/Session.utils';

const PROTECTED_ROUTES = ['/users', '/projects', '/settings'];

export const middleware = (request: NextRequest) => {
  const token = request.cookies.get('spybee_token')?.value;
  const { pathname } = request.nextUrl;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) => 
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    if (!token) {
      const loginUrl = new URL('/', request.url);
      return NextResponse.redirect(loginUrl);
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      const response = NextResponse.redirect(new URL('/', request.url));
      response.cookies.delete('spybee_token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public|api/auth).*)',
  ],
};
