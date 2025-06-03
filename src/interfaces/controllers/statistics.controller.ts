import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('statistics')
export class StatisticsController {
  @Get()
  @HttpCode(HttpStatus.OK)
  async getStatistics() {
    return {
      count: 0,
      sum: 0,
      avg: 0,
      min: 0,
      max: 0,
    };
  }
}
