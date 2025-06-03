import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Verifica o status da aplicação' })
  @ApiResponse({
    status: 200,
    description: 'Aplicação saudável',
    schema: { example: { status: 'ok' } },
  })
  health() {
    return { status: 'ok' };
  }
}
