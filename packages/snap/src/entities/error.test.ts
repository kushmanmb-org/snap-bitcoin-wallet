import {
  BaseError,
  FormatError,
  ValidationError,
  NotFoundError,
  ExternalServiceError,
  SynchronizationError,
  WalletError,
  StorageError,
  InexistentMethodError,
  PermissionError,
  UserActionError,
  AssertionError,
} from './error';

describe('error classes', () => {
  describe('BaseError', () => {
    it('creates error with message and code', () => {
      const error = new BaseError('test message', 100);

      expect(error.message).toBe('test message');
      expect(error.code).toBe(100);
      expect(error.data).toBeUndefined();
      expect(error.cause).toBeUndefined();
    });

    it('creates error with all properties', () => {
      const cause = new Error('underlying error');
      const data = { foo: 'bar' };
      const error = new BaseError('test message', 100, data, cause);

      expect(error.message).toBe('test message');
      expect(error.code).toBe(100);
      expect(error.data).toStrictEqual({ foo: 'bar' });
      expect(error.cause).toBe(cause);
    });

    it('is an instance of Error', () => {
      const error = new BaseError('test', 0);
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(BaseError);
    });
  });

  describe('FormatError', () => {
    it('creates error with correct defaults', () => {
      const error = new FormatError('Invalid format');

      expect(error.message).toBe('Invalid format');
      expect(error.name).toBe('FormatError');
      expect(error.code).toBe(0);
    });

    it('creates error with data and cause', () => {
      const cause = new Error('parse error');
      const error = new FormatError(
        'Invalid address format',
        { address: 'abc' },
        cause,
      );

      expect(error.message).toBe('Invalid address format');
      expect(error.data).toStrictEqual({ address: 'abc' });
      expect(error.cause).toBe(cause);
    });

    it('is an instance of BaseError', () => {
      const error = new FormatError('test');
      expect(error).toBeInstanceOf(BaseError);
      expect(error).toBeInstanceOf(FormatError);
    });
  });

  describe('ValidationError', () => {
    it('creates error with correct defaults', () => {
      const error = new ValidationError('Validation failed');

      expect(error.message).toBe('Validation failed');
      expect(error.name).toBe('ValidationError');
      expect(error.code).toBe(1000);
    });

    it('creates error with data and cause', () => {
      const error = new ValidationError(
        'Amount must be positive',
        { amount: -10 },
        new Error('underlying'),
      );

      expect(error.data).toStrictEqual({ amount: -10 });
      expect(error.cause).toBeInstanceOf(Error);
    });
  });

  describe('NotFoundError', () => {
    it('creates error with correct defaults', () => {
      const error = new NotFoundError('Account not found');

      expect(error.message).toBe('Account not found');
      expect(error.name).toBe('NotFoundError');
      expect(error.code).toBe(2000);
    });

    it('creates error with data', () => {
      const error = new NotFoundError('Account not found', {
        accountId: '123',
      });

      expect(error.data).toStrictEqual({ accountId: '123' });
    });
  });

  describe('ExternalServiceError', () => {
    it('creates error with correct defaults', () => {
      const error = new ExternalServiceError('Price API unavailable');

      expect(error.message).toBe('Price API unavailable');
      expect(error.name).toBe('ExternalServiceError');
      expect(error.code).toBe(3000);
    });

    it('creates error with data and cause', () => {
      const networkError = new Error('ECONNREFUSED');
      const error = new ExternalServiceError(
        'Failed to fetch prices',
        { endpoint: '/v1/prices' },
        networkError,
      );

      expect(error.data).toStrictEqual({ endpoint: '/v1/prices' });
      expect(error.cause).toBe(networkError);
    });
  });

  describe('SynchronizationError', () => {
    it('creates error with correct defaults', () => {
      const error = new SynchronizationError('Accounts failed to synchronize');

      expect(error.message).toBe('Accounts failed to synchronize');
      expect(error.name).toBe('SynchronizationError');
      expect(error.code).toBe(3100);
    });

    it('is a subtype of ExternalServiceError code range', () => {
      const error = new SynchronizationError('sync failed');
      expect(error.code).toBe(3100);
      expect(error.code).toBeGreaterThanOrEqual(3000);
      expect(error.code).toBeLessThan(4000);
    });
  });

  describe('WalletError', () => {
    it('creates error with correct defaults', () => {
      const error = new WalletError('Insufficient funds');

      expect(error.message).toBe('Insufficient funds');
      expect(error.name).toBe('WalletError');
      expect(error.code).toBe(4000);
    });

    it('creates error with data', () => {
      const error = new WalletError('Transaction failed', {
        txid: 'abc123',
        reason: 'Insufficient balance',
      });

      expect(error.data).toStrictEqual({
        txid: 'abc123',
        reason: 'Insufficient balance',
      });
    });
  });

  describe('StorageError', () => {
    it('creates error with correct defaults', () => {
      const error = new StorageError('Failed to insert account');

      expect(error.message).toBe('Failed to insert account');
      expect(error.name).toBe('StorageError');
      expect(error.code).toBe(5000);
    });

    it('creates error with cause', () => {
      const dbError = new Error('Database connection lost');
      const error = new StorageError('Failed to save', {}, dbError);

      expect(error.cause).toBe(dbError);
    });
  });

  describe('InexistentMethodError', () => {
    it('creates error with correct defaults', () => {
      const error = new InexistentMethodError('Method not implemented');

      expect(error.message).toBe('Method not implemented');
      expect(error.name).toBe('InexistentMethodError');
      expect(error.code).toBe(6000);
    });

    it('creates error with data about missing method', () => {
      const error = new InexistentMethodError('Method not found', {
        method: 'getBalance',
      });

      expect(error.data).toStrictEqual({ method: 'getBalance' });
    });
  });

  describe('PermissionError', () => {
    it('creates error with correct defaults', () => {
      const error = new PermissionError('Invalid origin');

      expect(error.message).toBe('Invalid origin');
      expect(error.name).toBe('PermissionError');
      expect(error.code).toBe(7000);
    });

    it('creates error with data about permission issue', () => {
      const error = new PermissionError('Access denied', {
        requiredPermission: 'write',
        currentPermission: 'read',
      });

      expect(error.data).toStrictEqual({
        requiredPermission: 'write',
        currentPermission: 'read',
      });
    });
  });

  describe('UserActionError', () => {
    it('creates error with correct defaults', () => {
      const error = new UserActionError('User canceled the send flow');

      expect(error.message).toBe('User canceled the send flow');
      expect(error.name).toBe('UserActionError');
      expect(error.code).toBe(8000);
    });

    it('creates error with data about user action', () => {
      const error = new UserActionError('User rejected', {
        action: 'sign',
        step: 'confirmation',
      });

      expect(error.data).toStrictEqual({
        action: 'sign',
        step: 'confirmation',
      });
    });
  });

  describe('AssertionError', () => {
    it('creates error with correct defaults', () => {
      const error = new AssertionError('Inconsistent state detected');

      expect(error.message).toBe('Inconsistent state detected');
      expect(error.name).toBe('AssertionError');
      expect(error.code).toBe(9000);
    });

    it('creates error with data about assertion failure', () => {
      const error = new AssertionError('Expected X, got Y', {
        expected: 'X',
        actual: 'Y',
      });

      expect(error.data).toStrictEqual({
        expected: 'X',
        actual: 'Y',
      });
    });
  });

  describe('error code uniqueness', () => {
    it('each error type has a unique base code', () => {
      const errors = [
        new FormatError(''),
        new ValidationError(''),
        new NotFoundError(''),
        new ExternalServiceError(''),
        new SynchronizationError(''),
        new WalletError(''),
        new StorageError(''),
        new InexistentMethodError(''),
        new PermissionError(''),
        new UserActionError(''),
        new AssertionError(''),
      ];

      const codes = errors.map((error) => error.code);
      const uniqueCodes = new Set(codes);

      expect(uniqueCodes.size).toBe(codes.length);
    });

    it('error codes are in ascending order by severity', () => {
      const expectedOrder = [
        new FormatError(''), // 0
        new ValidationError(''), // 1000
        new NotFoundError(''), // 2000
        new ExternalServiceError(''), // 3000
        new SynchronizationError(''), // 3100
        new WalletError(''), // 4000
        new StorageError(''), // 5000
        new InexistentMethodError(''), // 6000
        new PermissionError(''), // 7000
        new UserActionError(''), // 8000
        new AssertionError(''), // 9000
      ];

      for (let i = 0; i < expectedOrder.length - 1; i++) {
        expect(expectedOrder[i]?.code).toBeLessThan(
          expectedOrder[i + 1]?.code ?? 0,
        );
      }
    });
  });
});
