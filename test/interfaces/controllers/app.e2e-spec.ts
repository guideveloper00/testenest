import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';
import { AllExceptionsFilter } from '../../../src/presentation/adapters/all-exceptions.filter';

const validTransaction = () => ({
  amount: 100.5,
  timestamp: new Date(Date.now() - 5000).toISOString(),
});

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    console.log('DEBUG: beforeAll starting');
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    app.useGlobalFilters(new AllExceptionsFilter());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/transactions (POST)', () => {
    it('should create a transaction and return 201 with the created object', async () => {
      const payload = validTransaction();
      const res = await request(app.getHttpServer())
        .post('/transactions')
        .send(payload);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('amount', payload.amount);
      expect(typeof res.body.timestamp).toBe('string');
      expect(typeof res.body.id).toBe('string');
    });

    it('should return 400 for invalid body', async () => {
      const res = await request(app.getHttpServer())
        .post('/transactions')
        .send({ amount: 'invalid', timestamp: 'invalid' });
      expect(res.status).toBe(400);
    });
  });

  describe('/transactions (DELETE)', () => {
    it('should delete all transactions and return 204', async () => {
      const res = await request(app.getHttpServer()).delete('/transactions');
      expect(res.status).toBe(204);
    });
  });

  describe('/statistics (GET)', () => {
    it('should return statistics with required fields', async () => {
      const res = await request(app.getHttpServer()).get('/statistics');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('sum');
      expect(res.body).toHaveProperty('avg');
      expect(res.body).toHaveProperty('max');
      expect(res.body).toHaveProperty('min');
      expect(res.body).toHaveProperty('count');
    });
  });

  describe('/health (GET)', () => {
    it('should return health status', async () => {
      const res = await request(app.getHttpServer()).get('/health');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('status');
    });
  });

  describe('/metrics (GET)', () => {
    it('should return prometheus metrics in text format', async () => {
      const res = await request(app.getHttpServer()).get('/metrics');
      expect(res.status).toBe(200);
      expect(res.headers['content-type']).toContain('text/plain');
      expect(res.text).toContain('process_cpu_user_seconds_total');
    });
  });
});
