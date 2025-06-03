import {
  Controller,
  Post,
  Delete,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { TransactionAdapter } from '../adapters/transaction.adapter';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionAdapter: TransactionAdapter) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateTransactionDto) {
    await this.transactionAdapter.createTransaction(dto);
    return;
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async deleteAll() {
    await this.transactionAdapter.deleteAllTransactions();
    return;
  }
}
