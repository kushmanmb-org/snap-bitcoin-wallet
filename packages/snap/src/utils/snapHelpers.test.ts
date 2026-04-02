import { runSnapActionSafely } from './snapHelpers';
import type { Logger } from '../entities';

describe('snapHelpers', () => {
  describe('runSnapActionSafely', () => {
    let mockLogger: Logger;

    beforeEach(() => {
      mockLogger = {
        error: jest.fn(),
        warn: jest.fn(),
        info: jest.fn(),
        debug: jest.fn(),
        trace: jest.fn(),
      };
    });

    it('executes the async function successfully', async () => {
      const fn = jest.fn().mockResolvedValue(undefined);

      await runSnapActionSafely(fn, mockLogger, 'testAction');

      expect(fn).toHaveBeenCalled();
      expect(mockLogger.error).not.toHaveBeenCalled();
    });

    it('catches and logs errors without rethrowing', async () => {
      const error = new Error('Test error');
      const fn = jest.fn().mockRejectedValue(error);

      // Should not throw
      await runSnapActionSafely(fn, mockLogger, 'testAction');

      expect(mockLogger.error).toHaveBeenCalledWith(
        'Failed to execute snap action: testAction',
        error,
      );
    });

    it('logs the action name in error message', async () => {
      const fn = jest.fn().mockRejectedValue(new Error('Some error'));

      await runSnapActionSafely(fn, mockLogger, 'syncAccounts');

      expect(mockLogger.error).toHaveBeenCalledWith(
        expect.stringContaining('syncAccounts'),
        expect.any(Error),
      );
    });

    it('handles multiple sequential calls', async () => {
      const fn1 = jest.fn().mockResolvedValue(undefined);
      const fn2 = jest.fn().mockRejectedValue(new Error('Error 2'));
      const fn3 = jest.fn().mockResolvedValue(undefined);

      await runSnapActionSafely(fn1, mockLogger, 'action1');
      await runSnapActionSafely(fn2, mockLogger, 'action2');
      await runSnapActionSafely(fn3, mockLogger, 'action3');

      expect(fn1).toHaveBeenCalled();
      expect(fn2).toHaveBeenCalled();
      expect(fn3).toHaveBeenCalled();
      expect(mockLogger.error).toHaveBeenCalledTimes(1);
    });

    it('resolves to undefined on success', async () => {
      const fn = jest.fn().mockResolvedValue(undefined);

      const result = await runSnapActionSafely(fn, mockLogger, 'testAction');

      expect(result).toBeUndefined();
    });

    it('resolves to undefined on error', async () => {
      const fn = jest.fn().mockRejectedValue(new Error('Error'));

      const result = await runSnapActionSafely(fn, mockLogger, 'testAction');

      expect(result).toBeUndefined();
    });

    it('handles different error types', async () => {
      const stringError = 'string error';
      const fn = jest.fn().mockRejectedValue(stringError);

      await runSnapActionSafely(fn, mockLogger, 'action');

      expect(mockLogger.error).toHaveBeenCalledWith(
        'Failed to execute snap action: action',
        stringError,
      );
    });
  });
});
