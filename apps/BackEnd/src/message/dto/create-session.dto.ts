import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSessionDto {
  @ApiProperty({ description: 'The user id of a session.' })
  @IsString()
  @IsNotEmpty()
  readonly userId: string;
}
