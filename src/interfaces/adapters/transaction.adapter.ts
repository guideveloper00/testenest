import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { CreateTransactionUseCase } from '../../application/use-cases/create-transaction.use-case';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';

@Injectable()
export class TransactionAdapter {
  private readonly createTransactionUseCase: CreateTransactionUseCase;

  constructor(private readonly transactionRepository: TransactionRepository) {
    this.createTransactionUseCase = new CreateTransactionUseCase(
      transactionRepository,
    );
  }

  async createTransaction(dto: CreateTransactionDto): Promise<void> {
    await this.createTransactionUseCase.execute(dto);
  }

  async deleteAllTransactions(): Promise<void> {
    await this.transactionRepository.clear();
  }
}
