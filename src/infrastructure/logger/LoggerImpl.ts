import { Logger } from './Logger';

const levelByEnv = {
  development: 'debug',
  production: 'warn',
  test: 'none',
} as const;

type Environment = keyof typeof levelByEnv;
const currentEnv = (import.meta.env.VITE_NODE_ENV || 'development') as Environment;

const currentLogLevel = levelByEnv[currentEnv] ?? 'debug';

export const logger = Logger.getInstance({
    currentLogLevel,
    prefix: '[phrases-app]',
  });