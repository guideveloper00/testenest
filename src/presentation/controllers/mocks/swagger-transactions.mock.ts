import { CreateTransactionDto } from 'src/presentation/dtos/create-transaction.dto';

export const createTransactionSwagger = {
  summary: 'Cria uma nova transação',
  body: {
    description: 'Dados da transação',
    type: CreateTransactionDto,
    exampleValue: {
      amount: 100.5,
      timestamp: '2025-06-03T12:00:00.000Z',
    },
    exampleSummary: 'Transação válida',
  },
  apiResponses: [
    {
      status: 201,
      description: 'Transação criada com sucesso',
    },
    {
      status: 400,
      description: 'Dados inválidos',
    },
  ],
};

export const getAllTransactionsSwagger = {
  summary: 'Lista todas as transações registradas',
  apiResponses: [
    {
      status: 200,
      description: 'Lista de todas as transações',
    },
  ],
};

export const deleteAllTransactionsSwagger = {
  summary: 'Remove todas as transações',
  apiResponses: [
    {
      status: 204,
      description: 'Transações removidas com sucesso',
    },
  ],
};
