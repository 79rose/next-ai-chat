import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateSessionDto {
  @ApiProperty({ description: 'The user id of a session.' })
  @IsInt()
  @IsNotEmpty()
  readonly userId: number;
}
