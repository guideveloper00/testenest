import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { CreateTransactionUseCase } from '../../application/use-cases/create-transaction.use-case';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { StatisticsGateway } from '../gateways/statistics.gateway';
import { StatisticsAdapter } from './statistics.adapter';

@Injectable()
export class TransactionAdapter {
  private readonly createTransactionUseCase: CreateTransactionUseCase;

  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly statisticsAdapter: StatisticsAdapter,
    private readonly statisticsGateway: StatisticsGateway,
  ) {
    this.createTransactionUseCase = new CreateTransactionUseCase(
      transactionRepository,
    );
  }

  async createTransaction(dto: CreateTransactionDto): Promise<void> {
    await this.createTransactionUseCase.execute(dto);
    // Emitir estatísticas atualizadas via WebSocket
    const stats = await this.statisticsAdapter.getStatistics();
    this.statisticsGateway.sendStatisticsUpdate(stats);
  }

  async deleteAllTransactions(): Promise<void> {
    await this.transactionRepository.clear();
  }

  async getAllTransactions() {
    return (await this.transactionRepository.findAll()).map((t) => ({
      amount: t.getAmount(),
      timestamp: t.getTimestamp().toISOString(),
    }));
  }
}
