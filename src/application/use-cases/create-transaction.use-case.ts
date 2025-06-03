import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { Transaction } from '../../domain/entities/transaction.entity';
import {
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateTransactionInput } from '../interfaces/create-transaction.interface';

export class CreateTransactionUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(input: CreateTransactionInput): Promise<void> {
    let date: Date;
    try {
      date = new Date(input.timestamp);
      if (isNaN(date.getTime())) throw new Error();
    } catch {
      throw new BadRequestException('Invalid timestamp');
    }
    let transaction: Transaction;
    try {
      transaction = Transaction.create(input.amount, date);
    } catch (err: any) {
      if (err.message === 'Invalid amount') {
        throw new BadRequestException(err.message);
      }
      if (err.message === 'Transaction cannot be in the future') {
        throw new UnprocessableEntityException(err.message);
      }
      if (err.message === 'Invalid timestamp') {
        throw new BadRequestException(err.message);
      }
      throw err;
    }
    await this.transactionRepository.add(transaction);
  }
}
