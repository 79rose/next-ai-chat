import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

import { IsInt, IsNotEmpty } from 'class-validator';
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ description: 'The id of a user.' })
  @IsInt()
  @IsNotEmpty()
  readonly id: number;
}
