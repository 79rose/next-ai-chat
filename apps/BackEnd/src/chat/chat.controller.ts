import { Controller, Post, Body, Res } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Response } from 'express';
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  chat(@Body() body: any, @Res() res: Response) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    this.chatService.setResponse(res);
    this.chatService.chat(body);
  }
}
