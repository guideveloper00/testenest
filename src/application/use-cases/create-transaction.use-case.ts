import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { Transaction } from '../../domain/entities/transaction.entity';
import {
  ICreateTransactionInput,
  ICreateTransactionOutput,
} from '../types/create-transaction.type';

export class CreateTransactionUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(
    input: ICreateTransactionInput,
  ): Promise<ICreateTransactionOutput> {
    let transaction: Transaction;
    try {
      transaction = Transaction.create(input.amount, input.timestamp);
    } catch (err: any) {
      throw err;
    }
    await this.transactionRepository.add(transaction);
    return {
      amount: transaction.amount,
      timestamp: transaction.timestamp.toISOString(),
      uuid: transaction.uuid,
    };
  }
}
