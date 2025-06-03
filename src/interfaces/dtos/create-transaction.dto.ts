import { IsNumber, IsISO8601, Min } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(0)
  amount: number;

  @IsISO8601()
  timestamp: string;
}
