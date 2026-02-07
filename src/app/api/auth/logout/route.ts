import { NextResponse } from 'next/server';

export const POST = async () => {
  const response = NextResponse.json({ success: true });

  response.cookies.set('spybee_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(0),
    path: '/',
  });

  return response;
}
