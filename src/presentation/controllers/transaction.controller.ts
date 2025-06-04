import {
  Controller,
  Post,
  Delete,
  Body,
  HttpCode,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { TransactionAdapter } from '../adapters/transaction.adapter';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionAdapter: TransactionAdapter) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova transação' })
  @ApiBody({
    description: 'Dados da transação',
    type: CreateTransactionDto,
    examples: {
      exemplo: {
        summary: 'Transação válida',
        value: {
          amount: 100.5,
          timestamp: '2025-06-03T12:00:00.000Z',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Transação criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateTransactionDto) {
    return await this.transactionAdapter.createTransaction(dto);
  }

  @Delete()
  @ApiOperation({ summary: 'Remove todas as transações' })
  @ApiResponse({ status: 204, description: 'Transações removidas com sucesso' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAll() {
    await this.transactionAdapter.deleteAllTransactions();
    return;
  }

  @Get('all')
  @ApiOperation({ summary: 'Lista todas as transações registradas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todas as transações',
    schema: {
      example: [
        { amount: 100.5, timestamp: '2025-06-03T12:00:00.000Z' },
        { amount: 50, timestamp: '2025-06-03T12:01:00.000Z' },
      ],
    },
  })
  async getAll() {
    return await this.transactionAdapter.getAllTransactions();
  }
}
