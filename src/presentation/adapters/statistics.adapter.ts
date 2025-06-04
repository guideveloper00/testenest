import { Injectable } from '@nestjs/common';
import { InMemoryTransactionRepository } from '../../infrastructure/repositories/in-memory-transaction.repository';
@Injectable()
export class StatisticsAdapter {
  constructor(
    private readonly transactionRepository: InMemoryTransactionRepository,
  ) {}

  async getStatistics() {
    const transactions = await this.transactionRepository.findAll();
    const count = transactions.length;
    const sum = transactions.reduce((acc, t) => acc + t.amount, 0);
    const avg = count > 0 ? sum / count : 0;
    const min = count > 0 ? Math.min(...transactions.map((t) => t.amount)) : 0;
    const max = count > 0 ? Math.max(...transactions.map((t) => t.amount)) : 0;
    return { count, sum, avg, min, max };
  }
}
