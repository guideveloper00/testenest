import {
  Injectable,
  UnprocessableEntityException,
  BadRequestException,
} from '@nestjs/common';
import { InMemoryTransactionRepository } from '../../infrastructure/repositories/in-memory-transaction.repository';
import { Transaction } from '../../domain/entities/transaction.entity';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';

@Injectable()
export class TransactionAdapter {
  constructor(
    private readonly transactionRepository: InMemoryTransactionRepository,
  ) {}

  async createTransaction(dto: CreateTransactionDto): Promise<void> {
    if (
      typeof dto.amount !== 'number' ||
      isNaN(dto.amount) ||
      !isFinite(dto.amount)
    ) {
      throw new BadRequestException('Invalid amount');
    }
    if (dto.amount < 0) {
      throw new UnprocessableEntityException('Amount cannot be negative');
    }
    let date: Date;
    try {
      date = new Date(dto.timestamp);
      if (isNaN(date.getTime())) throw new Error();
    } catch {
      throw new BadRequestException('Invalid timestamp');
    }
    const now = Date.now();
    if (date.getTime() > now) {
      throw new UnprocessableEntityException(
        'Transaction cannot be in the future',
      );
    }
    const transaction = new Transaction(dto.amount, date);
    await this.transactionRepository.add(transaction);
  }

  async deleteAllTransactions(): Promise<void> {
    await this.transactionRepository.clear();
  }
}
