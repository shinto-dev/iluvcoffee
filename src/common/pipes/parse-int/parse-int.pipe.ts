import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

// This is just an example, similar one is already provided by NestJS.
@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const intValue = parseInt(value, 10);
    if (isNaN(intValue)) {
      throw new BadRequestException(
        `Validation failed. "${value}" is not an integer.`,
      );
    }
    return intValue;
  }
}
