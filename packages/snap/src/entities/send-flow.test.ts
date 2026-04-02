import { SendFormEvent, ReviewTransactionEvent } from './send-flow';

describe('send-flow entities', () => {
  describe('SendFormEvent enum', () => {
    it('has Amount event', () => {
      expect(SendFormEvent.Amount).toBe('amount');
    });

    it('has Recipient event', () => {
      expect(SendFormEvent.Recipient).toBe('recipient');
    });

    it('has ClearRecipient event', () => {
      expect(SendFormEvent.ClearRecipient).toBe('clearRecipient');
    });

    it('has ClearAmount event', () => {
      expect(SendFormEvent.ClearAmount).toBe('clearAmount');
    });

    it('has Confirm event', () => {
      expect(SendFormEvent.Confirm).toBe('confirm');
    });

    it('has Cancel event', () => {
      expect(SendFormEvent.Cancel).toBe('cancel');
    });

    it('has Max event', () => {
      expect(SendFormEvent.Max).toBe('max');
    });

    it('has Account event', () => {
      expect(SendFormEvent.Account).toBe('account');
    });

    it('has Asset event', () => {
      expect(SendFormEvent.Asset).toBe('asset');
    });

    it('has SwitchCurrency event', () => {
      expect(SendFormEvent.SwitchCurrency).toBe('switchCurrency');
    });
  });

  describe('ReviewTransactionEvent enum', () => {
    it('has Send event', () => {
      expect(ReviewTransactionEvent.Send).toBe('send');
    });

    it('has HeaderBack event', () => {
      expect(ReviewTransactionEvent.HeaderBack).toBe('headerBack');
    });
  });
});
