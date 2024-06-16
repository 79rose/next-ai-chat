import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateSessionDto {
  @ApiProperty({ description: 'The title of a session.' })
  @IsString()
  @IsNotEmpty()
  readonly title: string;
}
