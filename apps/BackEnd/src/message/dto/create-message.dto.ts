// - 每个会话包含了多个消息，用于记录用户和模型之间的聊天内容。
// - 每条消息有唯一的消息ID、会话ID、用户ID、消息内容、发送时间、发送者类型和消息类型。
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({ description: 'The session id of a message.' })
  @IsInt()
  @IsNotEmpty()
  readonly sessionId: number;
  @ApiProperty({ description: 'The content of a message.' })
  @IsString()
  @IsNotEmpty()
  readonly content: string;
  @ApiProperty({ description: 'The message type of a message.' })
  @IsString()
  @IsOptional()
  messageType: string;
  @ApiProperty({ description: 'The sender type of a message.' })
  @IsString()
  @IsOptional()
  senderType: string;
}
