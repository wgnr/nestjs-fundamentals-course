import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  // Global transformation in main.ts
  // @Type(() => Number)
  limit: number;

  @IsOptional()
  @IsPositive()
  // Global transformation in main.ts
  // @Type(() => Number)
  offset: number;
}
