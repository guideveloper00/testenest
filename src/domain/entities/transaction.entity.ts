import {
  InvalidAmountError,
  FutureTransactionError,
  InvalidTimestampError,
} from '../errors/transaction.errors';

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
      throw new InvalidAmountError();
    }
    this.amount = newAmount;
  }

  static create(amount: number, timestamp: Date) {
    if (typeof amount !== 'number' || isNaN(amount) || !isFinite(amount)) {
      throw new InvalidAmountError();
    }
    if (!(timestamp instanceof Date) || isNaN(timestamp.getTime())) {
      throw new InvalidTimestampError();
    }
    if (timestamp.getTime() > Date.now()) {
      throw new FutureTransactionError();
    }
    return new Transaction(amount, timestamp);
  }
}
