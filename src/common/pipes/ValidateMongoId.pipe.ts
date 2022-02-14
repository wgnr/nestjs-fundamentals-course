import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ValidateMongoIdPipe implements PipeTransform {
  transform(mongoId: string, metadata: ArgumentMetadata) {
    if (!isValidObjectId(mongoId))
      throw new BadRequestException(`Invalid ObjectId: ${mongoId}`);

    return mongoId;
  }
}
