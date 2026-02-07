import { kv } from '@vercel/kv';
import { User } from '@/shared/data/models/User.interface';

export const readUsers = async (): Promise<User[]> => {
  try {
    const users = await kv.get<User[]>('spybee_users');
    return users || [];
  } catch (error) {
    console.error('[KV] Error reading users:', error);
    return [];
  }
};

export const writeUser = async (newUser: User) => {
  try {
    const users = await readUsers();
    users.push(newUser);
    await kv.set('spybee_users', users);
  } catch (error) {
    console.error('[KV] Error writing user:', error);
    throw new Error('Database write failure');
  }
};
