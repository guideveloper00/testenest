import { Injectable } from '@nestjs/common';
import { InMemoryTransactionRepository } from '../../infrastructure/repositories/in-memory-transaction.repository';
import { Transaction } from '../../domain/entities/transaction.entity';

@Injectable()
export class StatisticsAdapter {
  constructor(
    private readonly transactionRepository: InMemoryTransactionRepository,
  ) {}

  async getStatistics() {
    const now = Date.now();
    const transactions = (await this.transactionRepository.findAll()).filter(
      (t: Transaction) => now - t.getTimestamp().getTime() <= 60000,
    );
    const count = transactions.length;
    const sum = transactions.reduce((acc, t) => acc + t.getAmount(), 0);
    const avg = count > 0 ? sum / count : 0;
    const min =
      count > 0 ? Math.min(...transactions.map((t) => t.getAmount())) : 0;
    const max =
      count > 0 ? Math.max(...transactions.map((t) => t.getAmount())) : 0;
    return { count, sum, avg, min, max };
  }
}
