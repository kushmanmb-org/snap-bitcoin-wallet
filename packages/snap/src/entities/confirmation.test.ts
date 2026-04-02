import { ConfirmationEvent } from './confirmation';

describe('confirmation entities', () => {
  describe('ConfirmationEvent enum', () => {
    it('has Confirm event', () => {
      expect(ConfirmationEvent.Confirm).toBe('confirmation-confirm');
    });

    it('has Cancel event', () => {
      expect(ConfirmationEvent.Cancel).toBe('confirmation-cancel');
    });
  });
});
