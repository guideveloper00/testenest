export class Transaction {
  private amount: number;
  private timestamp: Date;

  constructor(amount: number, timestamp: Date) {
    this.amount = amount;
    this.timestamp = timestamp;
  }

  getAmount(): number {
    return this.amount;
  }

  setAmount(amount: number): void {
    this.amount = amount;
  }

  getTimestamp(): Date {
    return this.timestamp;
  }

  setTimestamp(timestamp: Date): void {
    this.timestamp = timestamp;
  }
}
