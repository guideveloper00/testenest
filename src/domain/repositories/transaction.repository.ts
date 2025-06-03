import { Transaction } from '../entities/transaction.entity';

export interface TransactionRepository {
  add(transaction: Transaction): Promise<void>;
  clear(): Promise<void>;
  findAll(): Promise<Transaction[]>;
}
