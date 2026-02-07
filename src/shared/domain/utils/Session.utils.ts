import jwt, { JwtPayload } from 'jsonwebtoken';
import { logger } from './Logger.utils';

const SECRET = process.env.JWT_SECRET as string;

if (!SECRET) {
  logger.error('[session-utils] Missing authorization secret. Auth functions will fail.');
}

export interface SpybeeTokenPayload extends JwtPayload {
  id: string;
  email: string;
  rol: string;
}

export const generateToken = (payload: object): string | null => {
  if (!SECRET) {
    logger.error('[session-utils] Cannot generate token: SECRET is undefined');
    return null;
  }

  try {
    const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });
    logger.info('[session-utils] Token generated');
    return token;
  } catch (error) {
    logger.error('[session-utils] Error signing token', error);
    return null;
  }
};

export const verifyToken = (token: string): SpybeeTokenPayload | null => {
  if (!SECRET) {
    logger.error('[session-utils] Cannot verify token: SECRET is undefined');
    return null;
  }

  try {
    const decoded = jwt.verify(token, SECRET) as SpybeeTokenPayload;
    return decoded;
  } catch (error) {
    logger.warn('[session-utils] Token verification failed', {
      error: error instanceof Error ? error.message : 'Invalid token'
    });
    return null;
  }
};
