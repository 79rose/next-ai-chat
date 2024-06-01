import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty, IsInt } from 'class-validator';
export class CreateConfigDto {
  @ApiProperty({ description: 'The model id of a config.' })
  @IsInt()
  @IsNotEmpty()
  readonly model_id: number;
  @ApiProperty({ description: 'The name of a config.' })
  @IsString()
  @IsNotEmpty()
  readonly config_name: string;
  @ApiProperty({ description: 'The value of a config.' })
  @IsString()
  @IsNotEmpty()
  readonly config_value: string;
  @ApiProperty({ description: 'The description of a config.' })
  @IsString()
  @IsOptional()
  readonly config_desc: string;
}
