import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  // @Type(() => Number) // enableImplicitConversion: true,
  limit: number;

  @IsOptional()
  @IsPositive()
  // @Type(() => Number) // enableImplicitConversion: true,
  offset: number;
}
