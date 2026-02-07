import { NextResponse } from 'next/server';
import { hashPassword } from '@/shared/domain/utils/Password.utils';
import { logger } from '@/shared/domain/utils/Logger.utils';
import { readDB, writeDB } from '@/shared/domain/utils/FileHandler.utils';
import { User } from '@/shared/data/models/User.interface';

export const POST = async (req: Request) => {
  try {
    const { name, email, password } = await req.json();
    if (!email || !password || !name) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }
    const users: User[] = readDB();
    if (users.some((u) => u.email === email)) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }
    const hashedPassword = await hashPassword(password);
    const newUser: User = {
      id: crypto.randomUUID(),
      name,
      email,
      password: hashedPassword,
      rol: 'basic', 
    };
    users.push(newUser);
    writeDB(users);
    logger.info(`[Auth] User registered: ${email}`);
    return NextResponse.json({ success: true, message: 'User created' });
  } catch (error) {
    logger.error('[Auth] Register error', error);
    return NextResponse.json({ message: 'Internal error' }, { status: 500 });
  }
}
