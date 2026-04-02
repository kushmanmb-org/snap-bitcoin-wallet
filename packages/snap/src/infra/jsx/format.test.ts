import {
  exchangeAmount,
  displayExchangeAmount,
  translate,
  displayExplorerUrl,
  isValidSnapLinkProtocol,
  errorCodeToLabel,
  displayOrigin,
  displayCaip10,
  displayNetwork,
} from './format';

// Mock only specific parts of the module that are needed
jest.mock('@metamask/bitcoindevkit', () => ({
  BdkErrorCode: {
    0: 'InsufficientFunds',
    1: 'InvalidAddress',
    100: undefined,
  },
}));

describe('format utilities', () => {
  describe('exchangeAmount', () => {
    it('returns empty string when no exchange rate', () => {
      const result = exchangeAmount(BigInt(100000));
      expect(result).toBe('');
    });

    it('returns empty string for undefined exchange rate', () => {
      const result = exchangeAmount(BigInt(100000), undefined);
      expect(result).toBe('');
    });

    it('calculates exchange amount correctly', () => {
      const exchangeRate = {
        currency: 'USD',
        conversionRate: 50000,
        usdConversionRate: 1,
        conversionTime: Date.now(),
        conversionDate: Date.now(),
      };
      const result = exchangeAmount(BigInt(100000), exchangeRate);
      // 100000 * 50000 / 1e8 = 50
      expect(result).toBe('50.00');
    });

    it('handles small amounts', () => {
      const exchangeRate = {
        currency: 'USD',
        conversionRate: 50000,
        usdConversionRate: 1,
        conversionTime: Date.now(),
        conversionDate: Date.now(),
      };
      const result = exchangeAmount(BigInt(1), exchangeRate);
      // 1 * 50000 / 1e8 = 0.0005
      expect(result).toBe('0.00');
    });
  });

  describe('displayExchangeAmount', () => {
    it('returns empty string when no exchange rate', () => {
      const result = displayExchangeAmount(BigInt(100000));
      expect(result).toBe('');
    });

    it('formats exchange amount with currency', () => {
      const exchangeRate = {
        currency: 'USD',
        conversionRate: 50000,
        usdConversionRate: 1,
        conversionTime: Date.now(),
        conversionDate: Date.now(),
      };
      const result = displayExchangeAmount(BigInt(100000), exchangeRate);
      expect(result).toBe('50.00 USD');
    });
  });

  describe('translate', () => {
    it('returns message for existing key', () => {
      const messages = {
        greeting: { message: 'Hello, World!' },
        farewell: { message: 'Goodbye!' },
      };
      const translator = translate(messages);

      expect(translator('greeting')).toBe('Hello, World!');
      expect(translator('farewell')).toBe('Goodbye!');
    });

    it('returns placeholder for missing key', () => {
      const messages = {};
      const translator = translate(messages);

      expect(translator('nonexistent')).toBe('{nonexistent}');
    });

    it('handles empty messages object', () => {
      const translator = translate({});
      expect(translator('test')).toBe('{test}');
    });
  });

  describe('displayExplorerUrl', () => {
    it('constructs explorer URL for address', () => {
      const result = displayExplorerUrl(
        'https://mempool.space',
        'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      );
      expect(result).toBe(
        'https://mempool.space/address/bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      );
    });

    it('handles testnet explorer', () => {
      const result = displayExplorerUrl(
        'https://mempool.space/testnet',
        'tb1qtest',
      );
      expect(result).toBe('https://mempool.space/testnet/address/tb1qtest');
    });
  });

  describe('isValidSnapLinkProtocol', () => {
    it('returns true for https protocol', () => {
      expect(isValidSnapLinkProtocol('https://example.com')).toBe(true);
    });

    it('returns true for mailto protocol', () => {
      expect(isValidSnapLinkProtocol('mailto:test@example.com')).toBe(true);
    });

    it('returns true for metamask protocol', () => {
      expect(isValidSnapLinkProtocol('metamask://snap/abc123')).toBe(true);
    });

    it('returns false for http protocol', () => {
      expect(isValidSnapLinkProtocol('http://example.com')).toBe(false);
    });

    it('returns false for ftp protocol', () => {
      expect(isValidSnapLinkProtocol('ftp://example.com')).toBe(false);
    });

    it('returns false for javascript protocol', () => {
      // eslint-disable-next-line no-script-url
      expect(isValidSnapLinkProtocol('javascript:alert(1)')).toBe(false);
    });

    it('returns false for invalid URL', () => {
      expect(isValidSnapLinkProtocol('not-a-url')).toBe(false);
    });

    it('returns false for empty string', () => {
      expect(isValidSnapLinkProtocol('')).toBe(false);
    });
  });

  describe('errorCodeToLabel', () => {
    it('converts BDK error code to camelCase label', () => {
      const result = errorCodeToLabel(0);
      expect(result).toBe('insufficientFunds');
    });

    it('converts another error code', () => {
      const result = errorCodeToLabel(1);
      expect(result).toBe('invalidAddress');
    });

    it('returns unknownError for unknown code', () => {
      const result = errorCodeToLabel(100);
      expect(result).toBe('unknownError');
    });

    it('returns unknownError for negative code', () => {
      const result = errorCodeToLabel(-1);
      expect(result).toBe('unknownError');
    });
  });

  describe('displayOrigin', () => {
    it('extracts hostname from URL', () => {
      const result = displayOrigin('https://example.com/path?query=1');
      expect(result).toBe('example.com');
    });

    it('extracts hostname with subdomain', () => {
      const result = displayOrigin('https://app.example.com');
      expect(result).toBe('app.example.com');
    });

    it('handles localhost', () => {
      const result = displayOrigin('http://localhost:3000');
      expect(result).toBe('localhost');
    });
  });

  describe('displayCaip10', () => {
    it('formats bitcoin mainnet CAIP-10 address', () => {
      const result = displayCaip10(
        'bitcoin',
        'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      );
      expect(result).toBe(
        'bip122:000000000019d6689c085ae165831e93:bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      );
    });

    it('formats testnet CAIP-10 address', () => {
      const result = displayCaip10('testnet', 'tb1qtest');
      expect(result).toBe('bip122:000000000933ea01ad0ee984209779ba:tb1qtest');
    });

    it('formats signet CAIP-10 address', () => {
      const result = displayCaip10('signet', 'sb1qtest');
      expect(result).toBe('bip122:00000008819873e925422c1ff0f99f7c:sb1qtest');
    });
  });

  describe('displayNetwork', () => {
    it('capitalizes bitcoin network', () => {
      expect(displayNetwork('bitcoin')).toBe('Bitcoin');
    });

    it('capitalizes testnet network', () => {
      expect(displayNetwork('testnet')).toBe('Testnet');
    });

    it('capitalizes signet network', () => {
      expect(displayNetwork('signet')).toBe('Signet');
    });

    it('capitalizes regtest network', () => {
      expect(displayNetwork('regtest')).toBe('Regtest');
    });

    it('capitalizes testnet4 network', () => {
      expect(displayNetwork('testnet4')).toBe('Testnet4');
    });
  });
});
