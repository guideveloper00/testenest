export const getHealthSwagger = {
  summary: 'Verifica o status da aplicação',
  apiResponses: [
    {
      status: 200,
      description: 'Aplicação saudável',
      example: { status: 'ok' },
    },
  ],
};
