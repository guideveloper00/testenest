import { Transaction } from '../../domain/entities/transaction.entity';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';

export class InMemoryTransactionRepository implements TransactionRepository {
  private transactions: Transaction[] = [];

  async add(transaction: Transaction): Promise<void> {
    this.transactions.push(transaction);
  }

  async clear(): Promise<void> {
    this.transactions = [];
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactions;
  }
}
