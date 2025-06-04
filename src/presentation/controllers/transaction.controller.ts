import {
  Controller,
  Post,
  Delete,
  Body,
  HttpCode,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { TransactionAdapter } from '../adapters/transaction.adapter';
import { ICreateTransactionInput } from '../../application/types/create-transaction.type';
import { CustomSwaggerDecorator } from '../decorators/custom-swagger.decorator';
import {
  createTransactionSwagger,
  deleteAllTransactionsSwagger,
  getAllTransactionsSwagger,
} from './mocks/swagger-transactions.mock';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionAdapter: TransactionAdapter) {}

  @Post()
  @CustomSwaggerDecorator(createTransactionSwagger)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateTransactionDto) {
    const input: ICreateTransactionInput = {
      amount: dto.amount,
      timestamp: dto.timestamp,
    };
    return await this.transactionAdapter.createTransaction(input);
  }

  @Delete()
  @CustomSwaggerDecorator(deleteAllTransactionsSwagger)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAll() {
    await this.transactionAdapter.deleteAllTransactions();
    return;
  }

  @Get('all')
  @CustomSwaggerDecorator(getAllTransactionsSwagger)
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return await this.transactionAdapter.getAllTransactions();
  }
}
