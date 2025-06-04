import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StatisticsAdapter } from '../adapters/statistics.adapter';
import { CustomSwaggerDecorator } from '../decorators/custom-swagger.decorator';
import { getAllStatisticsSwagger } from './mocks/swagger-statistics.mock';

@ApiTags('Statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsAdapter: StatisticsAdapter) {}

  @Get()
  @CustomSwaggerDecorator(getAllStatisticsSwagger)
  @HttpCode(HttpStatus.OK)
  async getStatistics() {
    return await this.statisticsAdapter.getStatistics();
  }
}
