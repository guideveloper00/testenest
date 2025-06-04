import {
  Injectable,
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { CreateTransactionUseCase } from '../../application/use-cases/create-transaction.use-case';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { StatisticsAdapter } from './statistics.adapter';
import { IStatisticsGateway } from '../../infrastructure/types/statistics-gateway';

@Injectable()
export class TransactionAdapter {
  private readonly createTransactionUseCase: CreateTransactionUseCase;

  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly statisticsAdapter: StatisticsAdapter,
    private readonly statisticsGateway: IStatisticsGateway,
  ) {
    this.createTransactionUseCase = new CreateTransactionUseCase(
      transactionRepository,
    );
  }

  async createTransaction(dto: CreateTransactionDto) {
    try {
      const result = await this.createTransactionUseCase.execute({
        amount: dto.amount,
        timestamp: dto.timestamp,
      });
      await this.sendStatisticsUpdate();
      return result;
    } catch (err: any) {
      if (err.message === 'Invalid amount') {
        throw new BadRequestException(err.message);
      }
      if (err.message === 'Transaction cannot be in the future') {
        throw new UnprocessableEntityException(err.message);
      }
      throw err;
    }
  }

  private async sendStatisticsUpdate() {
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
