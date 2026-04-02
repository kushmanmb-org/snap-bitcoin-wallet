import { TrackingSnapEvent } from './snap';

describe('snap entities', () => {
  describe('TrackingSnapEvent enum', () => {
    it('has TransactionFinalized event', () => {
      expect(TrackingSnapEvent.TransactionFinalized).toBe(
        'Transaction Finalized',
      );
    });

    it('has TransactionSubmitted event', () => {
      expect(TrackingSnapEvent.TransactionSubmitted).toBe(
        'Transaction Submitted',
      );
    });

    it('has TransactionReorged event', () => {
      expect(TrackingSnapEvent.TransactionReorged).toBe('Transaction Reorged');
    });

    it('has TransactionReceived event', () => {
      expect(TrackingSnapEvent.TransactionReceived).toBe(
        'Transaction Received',
      );
    });
  });
});
