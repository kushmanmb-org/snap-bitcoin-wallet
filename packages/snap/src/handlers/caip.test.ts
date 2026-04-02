import { BtcAccountType, BtcScope } from '@metamask/keyring-api';

import {
  scopeToNetwork,
  caipToAddressType,
  networkToScope,
  addressTypeToCaip,
  Caip19Asset,
  networkToCaip19,
} from './caip';

describe('caip mappings', () => {
  describe('scopeToNetwork', () => {
    it('maps mainnet scope to bitcoin network', () => {
      expect(scopeToNetwork[BtcScope.Mainnet]).toBe('bitcoin');
    });

    it('maps testnet scope to testnet network', () => {
      expect(scopeToNetwork[BtcScope.Testnet]).toBe('testnet');
    });

    it('maps testnet4 scope to testnet4 network', () => {
      expect(scopeToNetwork[BtcScope.Testnet4]).toBe('testnet4');
    });

    it('maps signet scope to signet network', () => {
      expect(scopeToNetwork[BtcScope.Signet]).toBe('signet');
    });

    it('maps regtest scope to regtest network', () => {
      expect(scopeToNetwork[BtcScope.Regtest]).toBe('regtest');
    });
  });

  describe('networkToScope', () => {
    it('maps bitcoin network to mainnet scope', () => {
      expect(networkToScope.bitcoin).toBe(BtcScope.Mainnet);
    });

    it('maps testnet network to testnet scope', () => {
      expect(networkToScope.testnet).toBe(BtcScope.Testnet);
    });

    it('maps testnet4 network to testnet4 scope', () => {
      expect(networkToScope.testnet4).toBe(BtcScope.Testnet4);
    });

    it('maps signet network to signet scope', () => {
      expect(networkToScope.signet).toBe(BtcScope.Signet);
    });

    it('maps regtest network to regtest scope', () => {
      expect(networkToScope.regtest).toBe(BtcScope.Regtest);
    });
  });

  describe('caipToAddressType', () => {
    it('maps P2PKH account type to p2pkh address type', () => {
      expect(caipToAddressType[BtcAccountType.P2pkh]).toBe('p2pkh');
    });

    it('maps P2SH account type to p2sh address type', () => {
      expect(caipToAddressType[BtcAccountType.P2sh]).toBe('p2sh');
    });

    it('maps P2WPKH account type to p2wpkh address type', () => {
      expect(caipToAddressType[BtcAccountType.P2wpkh]).toBe('p2wpkh');
    });

    it('maps P2TR account type to p2tr address type', () => {
      expect(caipToAddressType[BtcAccountType.P2tr]).toBe('p2tr');
    });
  });

  describe('addressTypeToCaip', () => {
    it('maps p2pkh to P2PKH account type', () => {
      expect(addressTypeToCaip.p2pkh).toBe(BtcAccountType.P2pkh);
    });

    it('maps p2sh to P2SH account type', () => {
      expect(addressTypeToCaip.p2sh).toBe(BtcAccountType.P2sh);
    });

    it('maps p2wpkh to P2WPKH account type', () => {
      expect(addressTypeToCaip.p2wpkh).toBe(BtcAccountType.P2wpkh);
    });

    it('maps p2tr to P2TR account type', () => {
      expect(addressTypeToCaip.p2tr).toBe(BtcAccountType.P2tr);
    });
  });

  describe('Caip19Asset enum', () => {
    it('has correct bitcoin mainnet asset identifier', () => {
      expect(Caip19Asset.Bitcoin).toBe(
        'bip122:000000000019d6689c085ae165831e93/slip44:0',
      );
    });

    it('has correct testnet asset identifier', () => {
      expect(Caip19Asset.Testnet).toBe(
        'bip122:000000000933ea01ad0ee984209779ba/slip44:0',
      );
    });

    it('has correct testnet4 asset identifier', () => {
      expect(Caip19Asset.Testnet4).toBe(
        'bip122:00000000da84f2bafbbc53dee25a72ae/slip44:0',
      );
    });

    it('has correct signet asset identifier', () => {
      expect(Caip19Asset.Signet).toBe(
        'bip122:00000008819873e925422c1ff0f99f7c/slip44:0',
      );
    });

    it('has correct regtest asset identifier', () => {
      expect(Caip19Asset.Regtest).toBe('bip122:regtest/slip44:0');
    });
  });

  describe('networkToCaip19', () => {
    it('maps bitcoin network to bitcoin asset', () => {
      expect(networkToCaip19.bitcoin).toBe(Caip19Asset.Bitcoin);
    });

    it('maps testnet network to testnet asset', () => {
      expect(networkToCaip19.testnet).toBe(Caip19Asset.Testnet);
    });

    it('maps testnet4 network to testnet4 asset', () => {
      expect(networkToCaip19.testnet4).toBe(Caip19Asset.Testnet4);
    });

    it('maps signet network to signet asset', () => {
      expect(networkToCaip19.signet).toBe(Caip19Asset.Signet);
    });

    it('maps regtest network to regtest asset', () => {
      expect(networkToCaip19.regtest).toBe(Caip19Asset.Regtest);
    });
  });

  describe('round-trip mappings', () => {
    it('scopeToNetwork and networkToScope are inverse mappings', () => {
      Object.values(BtcScope).forEach((scope) => {
        const network = scopeToNetwork[scope];
        expect(networkToScope[network]).toBe(scope);
      });
    });

    it('caipToAddressType and addressTypeToCaip are inverse mappings', () => {
      Object.values(BtcAccountType).forEach((accountType) => {
        const addressType = caipToAddressType[accountType];
        expect(addressTypeToCaip[addressType]).toBe(accountType);
      });
    });
  });
});
