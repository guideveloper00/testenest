import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatisticsGateway } from './interfaces/gateways/statistics.gateway';
import { TransactionAdapter } from './interfaces/adapters/transaction.adapter';
import { InMemoryTransactionRepository } from './infrastructure/repositories/in-memory-transaction.repository';
import { ThrottlerModule } from '@nestjs/throttler';

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
  controllers: [AppController],
  providers: [
    AppService,
    StatisticsGateway,
    InMemoryTransactionRepository,
    TransactionAdapter,
  ],
})
export class AppModule {}
