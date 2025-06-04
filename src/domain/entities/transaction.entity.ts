import {
  InvalidAmountError,
  FutureTransactionError,
  InvalidTimestampError,
} from '../errors/transaction.errors';

export class Transaction {
  private _uuid: string;
  private _amount: number;
  private _timestamp: Date;

  private constructor(amount: number, timestamp: Date) {
    this._amount = amount;
    this._timestamp = timestamp;
    this._uuid = crypto.randomUUID();
  }

  get uuid(): string {
    return this._uuid;
  }

  set uuid(value: string) {
    this._uuid = value;
  }

  get amount(): number {
    return this._amount;
  }

  get timestamp(): Date {
    return this._timestamp;
  }

  updateAmount(newAmount: number): void {
    if (
      typeof newAmount !== 'number' ||
      isNaN(newAmount) ||
      !isFinite(newAmount)
    ) {
      throw new InvalidAmountError();
    }
    this._amount = newAmount;
  }

  static create(amount: number, timestamp: Date): Transaction {
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
