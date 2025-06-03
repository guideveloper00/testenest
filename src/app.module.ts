import { Module } from '@nestjs/common';
import { StatisticsGateway } from './presentation/gateways/statistics.gateway';
import { TransactionAdapter } from './presentation/adapters/transaction.adapter';
import { InMemoryTransactionRepository } from './infrastructure/repositories/in-memory-transaction.repository';
import { ThrottlerModule } from '@nestjs/throttler';
import { TransactionController } from './presentation/controllers/transaction.controller';
import { StatisticsController } from './presentation/controllers/statistics.controller';
import { HealthController } from './presentation/controllers/health.controller';
import { StatisticsAdapter } from './presentation/adapters/statistics.adapter';
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
      useFactory: (repo, statsAdapter, statsGateway) =>
        new TransactionAdapter(repo, statsAdapter, statsGateway),
      inject: ['TransactionRepository', StatisticsAdapter, StatisticsGateway],
    },
    {
      provide: StatisticsAdapter,
      useFactory: (repo) => new StatisticsAdapter(repo),
      inject: ['TransactionRepository'],
    },
  ],
})
export class AppModule {}
