import {
  Injectable,
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
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

  async createTransaction(dto: CreateTransactionDto) {
    try {
      const result = await this.createTransactionUseCase.execute({
        amount: dto.amount,
        timestamp: dto.timestamp,
      });
      const stats = await this.statisticsAdapter.getStatistics();
      this.statisticsGateway.sendStatisticsUpdate(stats);
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
