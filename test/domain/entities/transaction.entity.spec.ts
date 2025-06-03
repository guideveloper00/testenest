import { Transaction } from '../../../src/domain/entities/transaction.entity';

describe('Transaction Entity', () => {
  it('should create a transaction with amount and timestamp', () => {
    const amount = 100.5;
    const timestamp = new Date('2023-01-01T00:00:00Z');
    const transaction = new Transaction(amount, timestamp);
    expect(transaction.getAmount()).toBe(amount);
    expect(transaction.getTimestamp()).toBe(timestamp);
  });

  it('should set and get amount', () => {
    const transaction = new Transaction(0, new Date());
    transaction.setAmount(200);
    expect(transaction.getAmount()).toBe(200);
  });

  it('should set and get timestamp', () => {
    const transaction = new Transaction(0, new Date('2020-01-01T00:00:00Z'));
    const newTimestamp = new Date('2025-06-03T12:00:00Z');
    transaction.setTimestamp(newTimestamp);
    expect(transaction.getTimestamp()).toBe(newTimestamp);
  });

  it('should handle negative amounts', () => {
    const transaction = new Transaction(-50, new Date());
    expect(transaction.getAmount()).toBe(-50);
  });

  it('should handle future and past timestamps', () => {
    const past = new Date('2000-01-01T00:00:00Z');
    const future = new Date('2100-01-01T00:00:00Z');
    const t1 = new Transaction(10, past);
    const t2 = new Transaction(20, future);
    expect(t1.getTimestamp()).toBe(past);
    expect(t2.getTimestamp()).toBe(future);
  });

  it('should allow setting amount to zero', () => {
    const transaction = new Transaction(10, new Date());
    transaction.setAmount(0);
    expect(transaction.getAmount()).toBe(0);
  });

  it('should allow setting timestamp to now', () => {
    const transaction = new Transaction(10, new Date('2020-01-01T00:00:00Z'));
    const now = new Date();
    transaction.setTimestamp(now);
    expect(transaction.getTimestamp()).toBe(now);
  });
});
