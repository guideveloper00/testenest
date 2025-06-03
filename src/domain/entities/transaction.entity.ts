export class Transaction {
  private amount: number;
  private timestamp: Date;

  private constructor(amount: number, timestamp: Date) {
    this.amount = amount;
    this.timestamp = timestamp;
  }

  getAmount(): number {
    return this.amount;
  }

  getTimestamp(): Date {
    return this.timestamp;
  }

  updateAmount(newAmount: number): void {
    if (
      typeof newAmount !== 'number' ||
      isNaN(newAmount) ||
      !isFinite(newAmount)
    ) {
      throw new Error('Invalid amount');
    }
    this.amount = newAmount;
  }

  updateTimestamp(newTimestamp: Date): void {
    if (!(newTimestamp instanceof Date) || isNaN(newTimestamp.getTime())) {
      throw new Error('Invalid timestamp');
    }
    if (newTimestamp.getTime() > Date.now()) {
      throw new Error('Transaction cannot be in the future');
    }
    this.timestamp = newTimestamp;
  }

  static create(amount: number, timestamp: Date) {
    return new Transaction(amount, timestamp);
  }
}
