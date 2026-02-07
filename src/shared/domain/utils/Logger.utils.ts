type LogLevel = 'info' | 'error' | 'warn';

interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  data?: unknown; 
}

const log = (level: LogLevel, message: string, data?: unknown): void => {
  const timestamp = new Date().toISOString();
  
  const payload: LogEntry = {
    timestamp,
    level: level.toUpperCase(),
    message,
  };

  if (data !== undefined) payload.data = data;
  const isServer = typeof window === 'undefined';

  if (process.env.NEXT_PUBLIC_REACT_ENV === 'development') {
    const colors = {
      info: '\x1b[32m',
      warn: '\x1b[33m',
      error: '\x1b[31m',
      reset: '\x1b[0m'
    };

    const prefix = isServer ? colors[level] : '';
    const suffix = isServer ? colors.reset : '';
    console.log(`${prefix}[${payload.level}]${suffix} ${message}`, data ?? '');
  } else {
    console.log(JSON.stringify(payload));
  }
};

export const logger = {
  info: (msg: string, data?: unknown) => log('info', msg, data),
  error: (msg: string, data?: unknown) => log('error', msg, data),
  warn: (msg: string, data?: unknown) => log('warn', msg, data),
};