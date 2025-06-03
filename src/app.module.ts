import { Module } from '@nestjs/common';
import { StatisticsGateway } from './interfaces/gateways/statistics.gateway';
import { TransactionAdapter } from './interfaces/adapters/transaction.adapter';
import { InMemoryTransactionRepository } from './infrastructure/repositories/in-memory-transaction.repository';
import { ThrottlerModule } from '@nestjs/throttler';
import { TransactionController } from './interfaces/controllers/transaction.controller';
import { StatisticsController } from './interfaces/controllers/statistics.controller';
import { HealthController } from './interfaces/controllers/health.controller';
import { StatisticsAdapter } from './interfaces/adapters/statistics.adapter';
import { LoggerModule } from 'nestjs-pino';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    LoggerModule.forRoot(
      process.env.NODE_ENV === 'development'
        ? {
            pinoHttp: {
              transport: {
                target: 'pino-pretty',
                options: { colorize: true },
              },
            },
          }
        : {},
    ),
    PrometheusModule.register(),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
  controllers: [TransactionController, StatisticsController, HealthController],
  providers: [
    StatisticsGateway,
    {
      provide: 'TransactionRepository',
      useClass: InMemoryTransactionRepository,
    },
    {
      provide: TransactionAdapter,
      useFactory: (repo) => new TransactionAdapter(repo),
      inject: ['TransactionRepository'],
    },
    {
      provide: StatisticsAdapter,
      useFactory: (repo) => new StatisticsAdapter(repo),
      inject: ['TransactionRepository'],
    },
  ],
})
export class AppModule {}
