import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Logger } from '@/infrastructure/logger/Logger';

describe('Logger', () => {
    beforeEach(() => { 
        vi.spyOn(console, 'debug').mockImplementation(() => {});
        vi.spyOn(console, 'info').mockImplementation(() => {});
        vi.spyOn(console, 'warn').mockImplementation(() => {});
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        Logger.resetInstance();
        vi.clearAllMocks();
    });

    describe('1- Singleton Pattern', () => {
        it('1- Should create only one instance', () => {
            const logger1 = Logger.getInstance();
            const logger2 = Logger.getInstance();
            expect(logger1).toBe(logger2);
        });

        it('2- Should use custom config when provided', () => {
            const customConfig = {
                currentLogLevel: 'error' as const,
                prefix: '[custom-prefix]'
            };
            const logger = Logger.getInstance(customConfig);
            logger.error('test error');
            
            expect(console.error).toHaveBeenCalledWith('[custom-prefix]', '[ERROR]', 'test error');
        });
    });

    describe('2- Log Levels', () => {
        it('1- Should log debug messages when level is debug', () => {
            const logger = Logger.getInstance({ currentLogLevel: 'debug', prefix: '[test]' });
            logger.debug('test debug');
            
            expect(console.debug).toHaveBeenCalledWith('[test]', '[DEBUG]', 'test debug');
        });

        it('2- Should not log debug messages when level is info', () => {
            const logger = Logger.getInstance({ currentLogLevel: 'info', prefix: '[test]' });
            logger.debug('test debug');
            
            expect(console.debug).not.toHaveBeenCalled();
        });

        it('3- Should log info messages when level is info', () => {
            const logger = Logger.getInstance({ currentLogLevel: 'info', prefix: '[test]' });
            logger.info('test info');
            
            expect(console.info).toHaveBeenCalledWith('[test]', '[INFO]', 'test info');
        });

        it('4- Should log warn messages when level is warn', () => {
            const logger = Logger.getInstance({ currentLogLevel: 'warn', prefix: '[test]' });
            logger.warn('test warn');
            
            expect(console.warn).toHaveBeenCalledWith('[test]', '[WARN]', 'test warn');
        });

        it('5- Should log error messages when level is error', () => {
            const logger = Logger.getInstance({ currentLogLevel: 'error', prefix: '[test]' });
            logger.error('test error');
            
            expect(console.error).toHaveBeenCalledWith('[test]', '[ERROR]', 'test error');
        });

        it('6- Should not log any messages when level is none', () => {
            const logger = Logger.getInstance({ currentLogLevel: 'none', prefix: '[test]' });
            logger.debug('test debug');
            logger.info('test info');
            logger.warn('test warn');
            logger.error('test error');
            
            expect(console.debug).not.toHaveBeenCalled();
            expect(console.info).not.toHaveBeenCalled();
            expect(console.warn).not.toHaveBeenCalled();
            expect(console.error).not.toHaveBeenCalled();
        });
    });

    describe('3- Multiple Arguments', () => {
        it('1- Should handle multiple arguments in log methods', () => {
            const logger = Logger.getInstance({ currentLogLevel: 'debug', prefix: '[test]' });
            const error = new Error('test error');
            logger.error('Failed operation', { userId: 123 }, error);
            
            expect(console.error).toHaveBeenCalledWith(
                '[test]', 
                '[ERROR]', 
                'Failed operation', 
                { userId: 123 }, 
                error
            );
        });
    });

    describe('4- Default Configuration', () => {
        it('1- Should use default config when no config is provided', () => {
            const logger = Logger.getInstance();
            logger.info('test info');
            
            expect(console.info).toHaveBeenCalledWith('[patients-app]', '[INFO]', 'test info');
        });
    });
});