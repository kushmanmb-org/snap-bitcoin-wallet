import { ConsoleLoggerAdapter } from './ConsoleLoggerAdapter';
import { LogLevel } from '../entities';

describe('ConsoleLoggerAdapter', () => {
  let consoleErrorSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;
  let consoleInfoSpy: jest.SpyInstance;
  let consoleDebugSpy: jest.SpyInstance;
  let consoleTraceSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
    consoleDebugSpy = jest.spyOn(console, 'debug').mockImplementation(() => {});
    consoleTraceSpy = jest.spyOn(console, 'trace').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('LogLevel.SILENT', () => {
    it('does not log any messages', () => {
      const logger = new ConsoleLoggerAdapter(LogLevel.SILENT);

      logger.error('error message');
      logger.warn('warn message');
      logger.info('info message');
      logger.debug('debug message');
      logger.trace('trace message');

      expect(consoleErrorSpy).not.toHaveBeenCalled();
      expect(consoleWarnSpy).not.toHaveBeenCalled();
      expect(consoleInfoSpy).not.toHaveBeenCalled();
      expect(consoleDebugSpy).not.toHaveBeenCalled();
      expect(consoleTraceSpy).not.toHaveBeenCalled();
    });
  });

  describe('LogLevel.ERROR', () => {
    it('logs only error messages', () => {
      const logger = new ConsoleLoggerAdapter(LogLevel.ERROR);

      logger.error('error message');
      logger.warn('warn message');
      logger.info('info message');
      logger.debug('debug message');
      logger.trace('trace message');

      expect(consoleErrorSpy).toHaveBeenCalledWith('error message');
      expect(consoleWarnSpy).not.toHaveBeenCalled();
      expect(consoleInfoSpy).not.toHaveBeenCalled();
      expect(consoleDebugSpy).not.toHaveBeenCalled();
      expect(consoleTraceSpy).not.toHaveBeenCalled();
    });
  });

  describe('LogLevel.WARN', () => {
    it('logs error and warn messages', () => {
      const logger = new ConsoleLoggerAdapter(LogLevel.WARN);

      logger.error('error message');
      logger.warn('warn message');
      logger.info('info message');
      logger.debug('debug message');
      logger.trace('trace message');

      expect(consoleErrorSpy).toHaveBeenCalledWith('error message');
      expect(consoleWarnSpy).toHaveBeenCalledWith('warn message');
      expect(consoleInfoSpy).not.toHaveBeenCalled();
      expect(consoleDebugSpy).not.toHaveBeenCalled();
      expect(consoleTraceSpy).not.toHaveBeenCalled();
    });
  });

  describe('LogLevel.INFO', () => {
    it('logs error, warn, and info messages', () => {
      const logger = new ConsoleLoggerAdapter(LogLevel.INFO);

      logger.error('error message');
      logger.warn('warn message');
      logger.info('info message');
      logger.debug('debug message');
      logger.trace('trace message');

      expect(consoleErrorSpy).toHaveBeenCalledWith('error message');
      expect(consoleWarnSpy).toHaveBeenCalledWith('warn message');
      expect(consoleInfoSpy).toHaveBeenCalledWith('info message');
      expect(consoleDebugSpy).not.toHaveBeenCalled();
      expect(consoleTraceSpy).not.toHaveBeenCalled();
    });
  });

  describe('LogLevel.DEBUG', () => {
    it('logs error, warn, info, and debug messages', () => {
      const logger = new ConsoleLoggerAdapter(LogLevel.DEBUG);

      logger.error('error message');
      logger.warn('warn message');
      logger.info('info message');
      logger.debug('debug message');
      logger.trace('trace message');

      expect(consoleErrorSpy).toHaveBeenCalledWith('error message');
      expect(consoleWarnSpy).toHaveBeenCalledWith('warn message');
      expect(consoleInfoSpy).toHaveBeenCalledWith('info message');
      expect(consoleDebugSpy).toHaveBeenCalledWith('debug message');
      expect(consoleTraceSpy).not.toHaveBeenCalled();
    });
  });

  describe('LogLevel.TRACE', () => {
    it('logs all messages including trace', () => {
      const logger = new ConsoleLoggerAdapter(LogLevel.TRACE);

      logger.error('error message');
      logger.warn('warn message');
      logger.info('info message');
      logger.debug('debug message');
      logger.trace('trace message');

      expect(consoleErrorSpy).toHaveBeenCalledWith('error message');
      expect(consoleWarnSpy).toHaveBeenCalledWith('warn message');
      expect(consoleInfoSpy).toHaveBeenCalledWith('info message');
      expect(consoleDebugSpy).toHaveBeenCalledWith('debug message');
      expect(consoleTraceSpy).toHaveBeenCalledWith('trace message');
    });
  });

  describe('multiple arguments', () => {
    it('passes multiple arguments to console methods', () => {
      const logger = new ConsoleLoggerAdapter(LogLevel.TRACE);
      const obj = { key: 'value' };
      const err = new Error('test error');

      logger.error('error:', obj, err);
      logger.warn('warn:', obj, 123);
      logger.info('info:', obj, true);
      logger.debug('debug:', obj, [1, 2, 3]);
      logger.trace('trace:', obj, null);

      expect(consoleErrorSpy).toHaveBeenCalledWith('error:', obj, err);
      expect(consoleWarnSpy).toHaveBeenCalledWith('warn:', obj, 123);
      expect(consoleInfoSpy).toHaveBeenCalledWith('info:', obj, true);
      expect(consoleDebugSpy).toHaveBeenCalledWith('debug:', obj, [1, 2, 3]);
      expect(consoleTraceSpy).toHaveBeenCalledWith('trace:', obj, null);
    });
  });

  describe('edge cases', () => {
    it('handles empty arguments', () => {
      const logger = new ConsoleLoggerAdapter(LogLevel.INFO);

      logger.info();

      expect(consoleInfoSpy).toHaveBeenCalledWith();
    });

    it('handles undefined and null values', () => {
      const logger = new ConsoleLoggerAdapter(LogLevel.DEBUG);

      logger.debug(undefined, null);

      expect(consoleDebugSpy).toHaveBeenCalledWith(undefined, null);
    });
  });
});
