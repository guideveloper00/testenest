import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { Transaction } from '../../domain/entities/transaction.entity';
import {
  CreateTransactionInput,
  CreateTransactionOutput,
} from '../types/create-transaction.type';

export class CreateTransactionUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(
    input: CreateTransactionInput,
  ): Promise<CreateTransactionOutput> {
    let transaction: Transaction;
    try {
      transaction = Transaction.create(input.amount, input.timestamp);
    } catch (err: any) {
      throw err;
    }
    await this.transactionRepository.add(transaction);
    return {
      amount: transaction.getAmount(),
      timestamp: transaction.getTimestamp(),
    };
  }
}
