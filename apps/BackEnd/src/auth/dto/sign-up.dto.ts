import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class SignUpDto {
  @ApiProperty({ description: 'The name of a user.' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @ApiProperty({ description: 'The password of a user.' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
  @ApiProperty({ description: 'The role of a user.' })
  @IsString()
  @IsNotEmpty()
  readonly user_role: string;
}
