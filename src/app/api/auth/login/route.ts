import { NextResponse } from 'next/server';
import { comparePassword } from '@/shared/domain/utils/Password.utils';
import { generateToken } from '@/shared/domain/utils/Session.utils';
import { logger } from '@/shared/domain/utils/Logger.utils';
import { readDB } from '@/shared/domain/utils/FileHandler.utils';
import { ROLE_ROUTES, UserRole } from '@/shared/data/config/Roles.config';
import { User } from '@/shared/data/models/User.interface';

export const POST = async(req: Request) => {
  try {
    const { email, password } = await req.json();

    const users: User[] = readDB();
    const user = users.find((u) => u.email === email);

    if (!user) {
      logger.warn(`[Auth] Login attempt failed: User not found (${email})`);
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      logger.warn(`[Auth] Login attempt failed: Wrong password (${email})`);
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const token = generateToken({ 
      id: user.id, 
      email: user.email, 
      rol: user.rol 
    });

    if (!token) {
      throw new Error('Token generation failed');
    }

    const response = NextResponse.json({
      success: true,
      data: {
        user: {
          name: user.name,
          email: user.email,
          rol: user.rol
        },
        routes: ROLE_ROUTES[user.rol as UserRole],
      }
    });

    response.cookies.set('spybee_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600,
      path: '/'
    });

    logger.info(`[Auth] Login successful: ${email}`);
    return response;

  } catch (error) {
    logger.error('[Auth] Login error', error);
    return NextResponse.json({ message: 'Internal error' }, { status: 500 });
  }
}
