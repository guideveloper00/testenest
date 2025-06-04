export class InvalidAmountError extends Error {
  constructor(message = 'Invalid amount') {
    super(message);
    this.name = 'InvalidAmountError';
  }
}

export class FutureTransactionError extends Error {
  constructor(message = 'Transaction cannot be in the future') {
    super(message);
    this.name = 'FutureTransactionError';
  }
}

export class InvalidTimestampError extends Error {
  constructor(message = 'Invalid timestamp') {
    super(message);
    this.name = 'InvalidTimestampError';
  }
}
