import { Psbt } from '@metamask/bitcoindevkit';

import { parsePsbt } from './parsers';
import { FormatError } from '../entities';

/* eslint-disable @typescript-eslint/naming-convention */
jest.mock('@metamask/bitcoindevkit', () => ({
  Psbt: {
    from_string: jest.fn(),
  },
}));

describe('parsers', () => {
  describe('parsePsbt', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('parses valid PSBT from base64 string', () => {
      const mockPsbt = { txid: 'mock-txid' };
      jest.mocked(Psbt.from_string).mockReturnValue(mockPsbt as any);

      const result = parsePsbt('cHNidP8BAAAAA...');

      expect(result).toBe(mockPsbt);
      expect(Psbt.from_string).toHaveBeenCalledWith('cHNidP8BAAAAA...');
    });

    it('throws FormatError for invalid PSBT', () => {
      const error = new Error('Invalid PSBT format');
      jest.mocked(Psbt.from_string).mockImplementation(() => {
        throw error;
      });

      expect(() => parsePsbt('invalid-psbt')).toThrow(FormatError);
    });

    it('includes transaction data in FormatError', () => {
      const error = new Error('Parse error');
      jest.mocked(Psbt.from_string).mockImplementation(() => {
        throw error;
      });

      try {
        parsePsbt('bad-psbt-data');
        fail('Expected FormatError to be thrown');
      } catch (err) {
        expect(err).toBeInstanceOf(FormatError);
        const formatError = err as FormatError;
        expect(formatError.message).toBe('Invalid PSBT');
        expect(formatError.data).toStrictEqual({ transaction: 'bad-psbt-data' });
        expect(formatError.cause).toBe(error);
      }
    });

    it('handles empty string', () => {
      const error = new Error('Empty input');
      jest.mocked(Psbt.from_string).mockImplementation(() => {
        throw error;
      });

      expect(() => parsePsbt('')).toThrow(FormatError);
    });
  });
});
