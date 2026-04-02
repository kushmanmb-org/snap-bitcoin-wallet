import type { Network } from '@metamask/bitcoindevkit';

import {
  AccountCapability,
  Purpose,
  Slip44,
  addressTypeToPurpose,
  purposeToAddressType,
  networkToCoinType,
} from './account';

describe('account entities', () => {
  describe('AccountCapability enum', () => {
    it('has all expected capabilities', () => {
      expect(AccountCapability.SignPsbt).toBe('signPsbt');
      expect(AccountCapability.ComputeFee).toBe('computeFee');
      expect(AccountCapability.FillPsbt).toBe('fillPsbt');
      expect(AccountCapability.BroadcastPsbt).toBe('broadcastPsbt');
      expect(AccountCapability.SendTransfer).toBe('sendTransfer');
      expect(AccountCapability.GetUtxo).toBe('getUtxo');
      expect(AccountCapability.ListUtxos).toBe('listUtxos');
      expect(AccountCapability.PublicDescriptor).toBe('publicDescriptor');
      expect(AccountCapability.SignMessage).toBe('signMessage');
    });
  });

  describe('Purpose enum', () => {
    it('has correct BIP purpose values', () => {
      expect(Purpose.Legacy).toBe(44);
      expect(Purpose.Segwit).toBe(49);
      expect(Purpose.NativeSegwit).toBe(84);
      expect(Purpose.Taproot).toBe(86);
      expect(Purpose.Multisig).toBe(45);
    });
  });

  describe('Slip44 enum', () => {
    it('has correct coin type values', () => {
      expect(Slip44.Bitcoin).toBe(0);
      expect(Slip44.Testnet).toBe(1);
    });
  });

  describe('addressTypeToPurpose', () => {
    it('maps p2pkh to Legacy purpose', () => {
      expect(addressTypeToPurpose.p2pkh).toBe(Purpose.Legacy);
    });

    it('maps p2sh to Segwit purpose', () => {
      expect(addressTypeToPurpose.p2sh).toBe(Purpose.Segwit);
    });

    it('maps p2wsh to Multisig purpose', () => {
      expect(addressTypeToPurpose.p2wsh).toBe(Purpose.Multisig);
    });

    it('maps p2wpkh to NativeSegwit purpose', () => {
      expect(addressTypeToPurpose.p2wpkh).toBe(Purpose.NativeSegwit);
    });

    it('maps p2tr to Taproot purpose', () => {
      expect(addressTypeToPurpose.p2tr).toBe(Purpose.Taproot);
    });
  });

  describe('purposeToAddressType', () => {
    it('maps Legacy purpose to p2pkh', () => {
      expect(purposeToAddressType[Purpose.Legacy]).toBe('p2pkh');
    });

    it('maps Segwit purpose to p2sh', () => {
      expect(purposeToAddressType[Purpose.Segwit]).toBe('p2sh');
    });

    it('maps Multisig purpose to p2wsh', () => {
      expect(purposeToAddressType[Purpose.Multisig]).toBe('p2wsh');
    });

    it('maps NativeSegwit purpose to p2wpkh', () => {
      expect(purposeToAddressType[Purpose.NativeSegwit]).toBe('p2wpkh');
    });

    it('maps Taproot purpose to p2tr', () => {
      expect(purposeToAddressType[Purpose.Taproot]).toBe('p2tr');
    });
  });

  describe('networkToCoinType', () => {
    it('maps bitcoin to Bitcoin coin type', () => {
      expect(networkToCoinType.bitcoin).toBe(Slip44.Bitcoin);
    });

    it('maps testnet to Testnet coin type', () => {
      expect(networkToCoinType.testnet).toBe(Slip44.Testnet);
    });

    it('maps testnet4 to Testnet coin type', () => {
      expect(networkToCoinType.testnet4).toBe(Slip44.Testnet);
    });

    it('maps signet to Testnet coin type', () => {
      expect(networkToCoinType.signet).toBe(Slip44.Testnet);
    });

    it('maps regtest to Testnet coin type', () => {
      expect(networkToCoinType.regtest).toBe(Slip44.Testnet);
    });

    it('all test networks use Testnet coin type', () => {
      const testNetworks: Network[] = [
        'testnet',
        'testnet4',
        'signet',
        'regtest',
      ];

      testNetworks.forEach((network) => {
        expect(networkToCoinType[network]).toBe(Slip44.Testnet);
      });
    });
  });

  describe('round-trip mappings', () => {
    it('addressTypeToPurpose and purposeToAddressType are inverse for standard types', () => {
      const standardTypes = ['p2pkh', 'p2sh', 'p2wpkh', 'p2tr'] as const;

      standardTypes.forEach((addressType) => {
        const purpose = addressTypeToPurpose[addressType];
        expect(purposeToAddressType[purpose]).toBe(addressType);
      });
    });
  });
});
