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

  it('should throw if timestamp is in the future', () => {
    const future = new Date(Date.now() + 100000);
    expect(() => Transaction.create(10, future)).toThrow(
      'Transaction cannot be in the future',
    );
  });

  it('should not throw for negative or NaN amount', () => {
    expect(() => Transaction.create(-1, new Date())).not.toThrow();
    expect(() => Transaction.create(NaN, new Date())).not.toThrow();
    expect(() => Transaction.create(Infinity, new Date())).not.toThrow();
    expect(() =>
      Transaction.create(undefined as any, new Date()),
    ).not.toThrow();
  });
});
