import { PartialType } from '@nestjs/mapped-types';
import { CreateCoffeeDto } from './create-coffee.dto';

// PartialType avoids duplication of code. It takes the CreateCoffeeDto and makes all of its properties optional.
export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}
