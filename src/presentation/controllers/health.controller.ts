import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomSwaggerDecorator } from '../decorators/custom-swagger.decorator';
import { getHealthSwagger } from './mocks/swagger-health.mock';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @CustomSwaggerDecorator(getHealthSwagger)
  @HttpCode(HttpStatus.OK)
  health() {
    return { status: 'ok' };
  }
}
