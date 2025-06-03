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

  static create(amount: number, timestamp: Date) {
    if (typeof amount !== 'number' || isNaN(amount) || !isFinite(amount)) {
      throw new Error('Invalid amount');
    }
    if (timestamp.getTime() > Date.now()) {
      throw new Error('Transaction cannot be in the future');
    }
    return new Transaction(amount, timestamp);
  }
}
