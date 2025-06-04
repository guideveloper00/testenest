import { InMemoryTransactionRepository } from '../../../src/infrastructure/repositories/in-memory-transaction.repository';
import { TransactionAdapter } from '../../../src/presentation/adapters/transaction.adapter';
import { CreateTransactionDto } from '../../../src/presentation/dtos/create-transaction.dto';
import {
  UnprocessableEntityException,
  BadRequestException,
} from '@nestjs/common';
import { StatisticsAdapter } from '../../../src/presentation/adapters/statistics.adapter';
import { StatisticsGateway } from '../../../src/presentation/gateways/statistics.gateway';

describe('TransactionAdapter', () => {
  let repo: InMemoryTransactionRepository;
  let statsAdapter: StatisticsAdapter;
  let statsGateway: StatisticsGateway;
  let adapter: TransactionAdapter;

  beforeEach(() => {
    repo = new InMemoryTransactionRepository();
    statsAdapter = {
      getStatistics: jest.fn().mockResolvedValue({}),
    } as any;
    statsGateway = {
      sendStatisticsUpdate: jest.fn(),
    } as any;
    adapter = new TransactionAdapter(repo, statsAdapter, statsGateway);
  });

  it('should add a valid transaction', async () => {
    const dto: CreateTransactionDto = {
      amount: 100,
      timestamp: new Date(),
    };
    await expect(adapter.createTransaction(dto)).resolves.toBeUndefined();
    const all = await repo.findAll();
    expect(all.length).toBe(1);
    expect(all[0].getAmount()).toBe(100);
  });

  it('should throw if timestamp is in the future', async () => {
    const future = new Date(Date.now() + 100000);
    const dto: CreateTransactionDto = {
      amount: 10,
      timestamp: future,
    };
    await expect(adapter.createTransaction(dto)).rejects.toThrow(
      UnprocessableEntityException,
    );
  });

  it('should throw if amount is not a number', async () => {
    const dto: any = {
      amount: 'abc',
      timestamp: new Date(),
    };
    await expect(adapter.createTransaction(dto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw if timestamp is invalid', async () => {
    const dto: CreateTransactionDto = {
      amount: 10,
      timestamp: 'invalid-date' as any,
    };
    await expect(adapter.createTransaction(dto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should clear all transactions', async () => {
    await adapter.createTransaction({
      amount: 1,
      timestamp: new Date(),
    });
    await adapter.deleteAllTransactions();
    const all = await repo.findAll();
    expect(all.length).toBe(0);
  });
});
