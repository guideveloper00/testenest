import { Module } from '@nestjs/common';
import { StatisticsGateway } from './interfaces/gateways/statistics.gateway';
import { TransactionAdapter } from './interfaces/adapters/transaction.adapter';
import { InMemoryTransactionRepository } from './infrastructure/repositories/in-memory-transaction.repository';
import { ThrottlerModule } from '@nestjs/throttler';
import { TransactionController } from './interfaces/controllers/transaction.controller';
import { StatisticsController } from './interfaces/controllers/statistics.controller';
import { HealthController } from './interfaces/controllers/health.controller';
import { StatisticsAdapter } from './interfaces/adapters/statistics.adapter';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'global',
          limit: 10,
          ttl: 60,
        },
      ],
    }),
  ],
  controllers: [TransactionController, StatisticsController, HealthController],
  providers: [
    StatisticsGateway,
    InMemoryTransactionRepository,
    TransactionAdapter,
    StatisticsAdapter,
  ],
})
export class AppModule {}
