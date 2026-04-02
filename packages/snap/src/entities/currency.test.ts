import type { Network } from '@metamask/bitcoindevkit';

import { CurrencyUnit, networkToCurrencyUnit } from './currency';

describe('currency entities', () => {
  describe('CurrencyUnit enum', () => {
    it('has Bitcoin unit', () => {
      expect(CurrencyUnit.Bitcoin).toBe('BTC');
    });

    it('has Testnet unit', () => {
      expect(CurrencyUnit.Testnet).toBe('tBTC');
    });

    it('has Signet unit', () => {
      expect(CurrencyUnit.Signet).toBe('sBTC');
    });

    it('has Regtest unit', () => {
      expect(CurrencyUnit.Regtest).toBe('rBTC');
    });

    it('has Fiat unit', () => {
      expect(CurrencyUnit.Fiat).toBe('fiat');
    });
  });

  describe('networkToCurrencyUnit', () => {
    it('maps bitcoin to BTC unit', () => {
      expect(networkToCurrencyUnit.bitcoin).toBe(CurrencyUnit.Bitcoin);
    });

    it('maps testnet to tBTC unit', () => {
      expect(networkToCurrencyUnit.testnet).toBe(CurrencyUnit.Testnet);
    });

    it('maps testnet4 to tBTC unit', () => {
      expect(networkToCurrencyUnit.testnet4).toBe(CurrencyUnit.Testnet);
    });

    it('maps signet to sBTC unit', () => {
      expect(networkToCurrencyUnit.signet).toBe(CurrencyUnit.Signet);
    });

    it('maps regtest to rBTC unit', () => {
      expect(networkToCurrencyUnit.regtest).toBe(CurrencyUnit.Regtest);
    });

    it('contains entries for all networks', () => {
      const networks: Network[] = [
        'bitcoin',
        'testnet',
        'testnet4',
        'signet',
        'regtest',
      ];

      networks.forEach((network) => {
        expect(networkToCurrencyUnit[network]).toBeDefined();
      });
    });

    it('testnet and testnet4 have the same currency unit', () => {
      expect(networkToCurrencyUnit.testnet).toBe(
        networkToCurrencyUnit.testnet4,
      );
    });
  });
});
