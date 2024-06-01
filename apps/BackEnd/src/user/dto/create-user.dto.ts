import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({ description: 'The name of a user.' })
  @IsString()
  readonly user_name: string;
  @ApiProperty({ description: 'The password of a user.' })
  @IsString()
  readonly password: string;
  @ApiProperty({ description: 'The avatar of a user.' })
  readonly user_avatar: string;
}
