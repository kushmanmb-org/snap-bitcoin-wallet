import { LogLevel } from './logger';

describe('logger entities', () => {
  describe('LogLevel enum', () => {
    it('has ERROR level', () => {
      expect(LogLevel.ERROR).toBe('error');
    });

    it('has WARN level', () => {
      expect(LogLevel.WARN).toBe('warn');
    });

    it('has INFO level', () => {
      expect(LogLevel.INFO).toBe('info');
    });

    it('has DEBUG level', () => {
      expect(LogLevel.DEBUG).toBe('debug');
    });

    it('has TRACE level', () => {
      expect(LogLevel.TRACE).toBe('trace');
    });

    it('has SILENT level', () => {
      expect(LogLevel.SILENT).toBe('silent');
    });
  });
});
