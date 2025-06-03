import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { TransactionRepository } from 'src/domain/repositories/transaction.repository';
import { Transaction } from 'src/domain/entities/transaction.entity';

@Injectable()
export class TransactionAdapter {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async createTransaction(dto: CreateTransactionDto): Promise<void> {
    const transaction = new Transaction(dto.amount, new Date(dto.timestamp));
    await this.transactionRepository.add(transaction);
  }

  async deleteAllTransactions(): Promise<void> {
    await this.transactionRepository.clear();
  }
}
