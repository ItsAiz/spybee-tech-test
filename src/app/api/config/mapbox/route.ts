import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/shared/domain/utils/Session.utils';

export const GET = async() => {
  const token = (await cookies()).get('spybee_token')?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json({ 
    token: process.env.MAPBOX_ACCESS_TOKEN
  });
}