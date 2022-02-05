import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata) {
    console.log(`ParseIntPipe ${value}`);
    const val = parseInt(value, 10);
    if (isNaN(val))
      throw new BadRequestException(
        `Validation failed. "${value}" is not an integer`,
      );

    return val;
  }
}
