import fs from 'fs';
import path from 'path';
import { logger } from './Logger.utils';
import { User } from '@/shared/data/models/User.interface';

const DB_PATH = path.join(process.cwd(), 'database.json');

export const readDB = (): User[] => {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const initialData: User[] = [];
      fs.writeFileSync(DB_PATH, JSON.stringify(initialData));
      return initialData;
    }
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data) as User[];
  } catch (error) {
    logger.error('[FileHandler] Error reading DB', error);
    return [];
  }
};

export const writeDB = (data: User[]): void => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    logger.error('[FileHandler] Error writing DB', error);
  }
};
