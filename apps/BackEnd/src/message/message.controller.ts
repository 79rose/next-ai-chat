import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { SessionService } from './session.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('session')
@Controller('session')
export class chatController {
  constructor(
    private readonly messageService: MessageService,
    private readonly sessionService: SessionService,
  ) {}

  @Post()
  create(@Body('userId') userId: number) {
    return this.sessionService.create(userId);
  }
  @Get()
  findAll(@Query('userId') userId?: string) {
    if (userId) {
      return this.sessionService.findAll(userId);
    }
    return this.sessionService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessionService.findOne(id);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() updateSessionDto: UpdateSessionDto) {
    return this.sessionService.update(id, updateSessionDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sessionService.remove(+id);
  }
  @Post(':id/message')
  createMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }
  // 获取当前session
  @Get(':id/message')
  findAllMessage(@Param('id') id: string) {
    return this.messageService.findAll(id);
  }
  @Get(':id/message/:id')
  findOneMessage(@Param('id') id: string) {
    return this.messageService.findOne(+id);
  }
  @Put(':id/message/:id')
  updateMessage(
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return this.messageService.update(+id, updateMessageDto);
  }
  @Delete(':id/message/:id')
  removeMessage(@Param('id') id: string) {
    return this.messageService.remove(+id);
  }
}
