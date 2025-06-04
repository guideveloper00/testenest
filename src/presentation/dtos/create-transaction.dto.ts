import { IsDate, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateTransactionDto {
  @ApiProperty({
    example: 100.5,
    description: 'Valor da transação',
  })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  amount: number;

  @ApiProperty({
    example: '2025-06-03T12:00:00.000Z',
    description: 'Data/hora da transação em formato ISO8601',
  })
  @Type(() => Date)
  @IsDate()
  timestamp: Date;
}
