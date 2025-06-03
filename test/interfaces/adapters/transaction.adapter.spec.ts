import { InMemoryTransactionRepository } from '../../../src/infrastructure/repositories/in-memory-transaction.repository';
import { TransactionAdapter } from '../../../src/interfaces/adapters/transaction.adapter';
import { CreateTransactionDto } from '../../../src/interfaces/dtos/create-transaction.dto';
import {
  UnprocessableEntityException,
  BadRequestException,
} from '@nestjs/common';
import { StatisticsAdapter } from '../../../src/interfaces/adapters/statistics.adapter';
import { StatisticsGateway } from '../../../src/interfaces/gateways/statistics.gateway';

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
      timestamp: new Date().toISOString(),
    };
    await expect(adapter.createTransaction(dto)).resolves.toBeUndefined();
    const all = await repo.findAll();
    expect(all.length).toBe(1);
    expect(all[0].getAmount()).toBe(100);
  });

  it('should throw if amount is negative', async () => {
    const dto: CreateTransactionDto = {
      amount: -1,
      timestamp: new Date().toISOString(),
    };
    await expect(adapter.createTransaction(dto)).rejects.toThrow(
      UnprocessableEntityException,
    );
  });

  it('should throw if timestamp is in the future', async () => {
    const future = new Date(Date.now() + 100000).toISOString();
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
      timestamp: new Date().toISOString(),
    };
    await expect(adapter.createTransaction(dto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw if timestamp is invalid', async () => {
    const dto: CreateTransactionDto = {
      amount: 10,
      timestamp: 'invalid-date',
    };
    await expect(adapter.createTransaction(dto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should clear all transactions', async () => {
    await adapter.createTransaction({
      amount: 1,
      timestamp: new Date().toISOString(),
    });
    await adapter.deleteAllTransactions();
    const all = await repo.findAll();
    expect(all.length).toBe(0);
  });
});
