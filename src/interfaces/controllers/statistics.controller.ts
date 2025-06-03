import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StatisticsAdapter } from '../adapters/statistics.adapter';

@ApiTags('Statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsAdapter: StatisticsAdapter) {}

  @Get()
  @ApiOperation({
    summary: 'Obtém estatísticas das transações dos últimos 60 segundos',
  })
  @ApiResponse({
    status: 200,
    description: 'Estatísticas calculadas com sucesso',
    schema: {
      example: {
        count: 2,
        sum: 200.5,
        avg: 100.25,
        min: 100.0,
        max: 100.5,
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  async getStatistics() {
    return await this.statisticsAdapter.getStatistics();
  }
}
