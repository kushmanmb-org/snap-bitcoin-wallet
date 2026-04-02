import type { Network } from '@metamask/bitcoindevkit';

import { networkToIcon } from './icons';

describe('icons', () => {
  describe('networkToIcon', () => {
    it('has icon for bitcoin mainnet', () => {
      expect(networkToIcon.bitcoin).toBeDefined();
      expect(networkToIcon.bitcoin).toContain('data:image/svg+xml;base64,');
    });

    it('has icon for testnet', () => {
      expect(networkToIcon.testnet).toBeDefined();
      expect(networkToIcon.testnet).toContain('data:image/svg+xml;base64,');
    });

    it('has icon for testnet4', () => {
      expect(networkToIcon.testnet4).toBeDefined();
      expect(networkToIcon.testnet4).toContain('data:image/svg+xml;base64,');
    });

    it('has icon for signet', () => {
      expect(networkToIcon.signet).toBeDefined();
      expect(networkToIcon.signet).toContain('data:image/svg+xml;base64,');
    });

    it('has icon for regtest', () => {
      expect(networkToIcon.regtest).toBeDefined();
      expect(networkToIcon.regtest).toContain('data:image/svg+xml;base64,');
    });

    it('has icons for all networks', () => {
      const networks: Network[] = [
        'bitcoin',
        'testnet',
        'testnet4',
        'signet',
        'regtest',
      ];

      networks.forEach((network) => {
        expect(networkToIcon[network]).toBeDefined();
        expect(typeof networkToIcon[network]).toBe('string');
      });
    });

    it('bitcoin and testnet icons are different', () => {
      expect(networkToIcon.bitcoin).not.toBe(networkToIcon.testnet);
    });

    it('testnet and testnet4 icons are the same', () => {
      // Both testnets use the same green icon
      expect(networkToIcon.testnet).toBe(networkToIcon.testnet4);
    });

    it('signet and regtest icons are the same', () => {
      // Both signet and regtest use the same purple icon
      expect(networkToIcon.signet).toBe(networkToIcon.regtest);
    });
  });
});
