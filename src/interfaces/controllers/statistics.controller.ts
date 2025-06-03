import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { StatisticsAdapter } from '../adapters/statistics.adapter';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsAdapter: StatisticsAdapter) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getStatistics() {
    return await this.statisticsAdapter.getStatistics();
  }
}
