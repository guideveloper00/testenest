import {
  Injectable,
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { CreateTransactionUseCase } from '../../application/use-cases/create-transaction.use-case';
import { StatisticsAdapter } from './statistics.adapter';
import { IStatisticsGateway } from '../../infrastructure/types/statistics-gateway';
import {
  InvalidAmountError,
  FutureTransactionError,
  InvalidTimestampError,
} from '../../domain/errors/transaction.errors';
import { ICreateTransactionInput } from '../../application/types/create-transaction.type';

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

  async createTransaction(input: ICreateTransactionInput) {
    try {
      const result = await this.createTransactionUseCase.execute({
        amount: input.amount,
        timestamp: input.timestamp,
      });
      await this.sendStatisticsUpdate();
      return result;
    } catch (err: any) {
      if (err instanceof InvalidAmountError) {
        throw new BadRequestException(err.message);
      }
      if (err instanceof FutureTransactionError) {
        throw new UnprocessableEntityException(err.message);
      }
      if (err instanceof InvalidTimestampError) {
        throw new BadRequestException(err.message);
      }
      throw new BadRequestException('Unexpected error in transaction creation');
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
