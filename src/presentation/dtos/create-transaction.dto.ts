import { IsNumber, IsISO8601, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({
    example: 100.5,
    description: 'Valor da transação',
    minimum: 0,
  })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(0)
  amount: number;

  @ApiProperty({
    example: '2025-06-03T12:00:00.000Z',
    description: 'Data/hora da transação em formato ISO8601',
  })
  @IsISO8601()
  timestamp: Date;
}
