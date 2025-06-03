import { Transaction } from '../../../src/domain/entities/transaction.entity';

describe('Transaction Entity', () => {
  it('should create a transaction with amount and timestamp', () => {
    const amount = 100.5;
    const timestamp = new Date('2023-01-01T00:00:00Z');
    const transaction = Transaction.create(amount, timestamp);
    expect(transaction.getAmount()).toBe(amount);
    expect(transaction.getTimestamp()).toBe(timestamp);
  });

  it('should update amount using updateAmount', () => {
    const transaction = Transaction.create(0, new Date());
    transaction.updateAmount(200);
    expect(transaction.getAmount()).toBe(200);
  });

  it('should throw if amount is negative', () => {
    expect(() => Transaction.create(-1, new Date())).toThrow(
      'Amount cannot be negative',
    );
  });

  it('should throw if amount is not a number', () => {
    expect(() => Transaction.create(NaN, new Date())).toThrow('Invalid amount');
    expect(() => Transaction.create(Infinity, new Date())).toThrow(
      'Invalid amount',
    );
    expect(() => Transaction.create(undefined as any, new Date())).toThrow(
      'Invalid amount',
    );
  });

  it('should update timestamp using updateTimestamp', () => {
    const transaction = Transaction.create(0, new Date('2020-01-01T00:00:00Z'));
    const newTimestamp = new Date('2025-06-03T12:00:00Z');
    transaction.updateTimestamp(newTimestamp);
    expect(transaction.getTimestamp()).toBe(newTimestamp);
  });

  it('should allow setting timestamp to now using updateTimestamp', () => {
    const transaction = Transaction.create(
      10,
      new Date('2020-01-01T00:00:00Z'),
    );
    const now = new Date();
    transaction.updateTimestamp(now);
    expect(transaction.getTimestamp()).toBe(now);
  });
});
