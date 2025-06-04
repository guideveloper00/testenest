export const getAllStatisticsSwagger = {
  summary: 'Obtém estatísticas das transações dos últimos 60 segundos',
  apiResponses: [
    {
      status: 200,
      description: 'Estatísticas calculadas com sucesso',
      example: {
        count: 2,
        sum: 200.5,
        avg: 100.25,
        min: 100.0,
        max: 100.5,
      },
    },
  ],
};
