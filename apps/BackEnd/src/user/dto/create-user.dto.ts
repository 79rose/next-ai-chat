import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({ description: 'The name of a user.' })
  @IsString()
  @IsNotEmpty()
  readonly user_name: string;
  @ApiProperty({ description: 'The password of a user.' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
  @ApiProperty({ description: 'The avatar of a user.' })
  @IsString()
  @IsOptional()
  readonly user_avatar: string;
  @ApiProperty({ description: 'The role of a user.' })
  @IsString()
  @IsOptional()
  readonly user_role: string;
}
