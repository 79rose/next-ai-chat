import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { throwError } from 'rxjs';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw throwError(`Validation failed. ${value} is not an integer.`);
    }
    return value;
  }
}
