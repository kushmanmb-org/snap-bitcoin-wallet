import type { Network } from '@metamask/bitcoindevkit';

import { BlockTime } from './chain';

describe('chain entities', () => {
  describe('BlockTime', () => {
    it('has 10 minute block time for bitcoin mainnet', () => {
      expect(BlockTime.bitcoin).toBe(10);
    });

    it('has 10 minute block time for testnet', () => {
      expect(BlockTime.testnet).toBe(10);
    });

    it('has 10 minute block time for testnet4', () => {
      expect(BlockTime.testnet4).toBe(10);
    });

    it('has 0.5 minute block time for signet', () => {
      expect(BlockTime.signet).toBe(0.5);
    });

    it('has 0.5 minute block time for regtest', () => {
      expect(BlockTime.regtest).toBe(0.5);
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
        expect(BlockTime[network]).toBeDefined();
        expect(typeof BlockTime[network]).toBe('number');
      });
    });

    it('signet and regtest have faster block times for development', () => {
      expect(BlockTime.signet).toBeLessThan(BlockTime.bitcoin);
      expect(BlockTime.regtest).toBeLessThan(BlockTime.testnet);
    });
  });
});
