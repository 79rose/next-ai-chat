import { Injectable } from '@nestjs/common';
import { xfxh } from './model/xfxh';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { Message } from 'src/message/entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}
  private res: Response;
  async chat(body: any) {
    const id = body.id;
    const promt = body.promt;
    const sock = xfxh(promt);
    let questionValue = '';
    // 监听连接的错误事件
    sock.on('error', function (err) {
      console.log('error: ', err);
      throw err;
    });

    // 监听消息事件，处理 API 响应
    sock.on('message', (data) => {
      // 解析 API 响应的 JSON 数据
      const obj = JSON.parse(data);
      // 提取文本消息
      if (obj && obj.payload && obj.payload.choices) {
        const texts = obj.payload.choices.text;
        if (!texts) {
          return;
        }
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that = this;
        texts.forEach(function (item) {
          questionValue += item.content;
          // 将文本消息发送给客户端
          console.log(item.content);
          that.res.write(item.content);
        });
      }
    });

    // 监听连接关闭事件，将结果通过 resolve 返回
    sock.on('close', async () => {
      // 将回调函数改为异步
      console.log('讯飞星火连接sock关闭!!!!');

      try {
        const Usermessage = this.messageRepository.create({
          content: promt,
          sessionId: id,
          senderType: 'user',
          messageType: 'text',
        });
        await this.messageRepository.save(Usermessage); // 使用 await 等待保存操作完成
        const Botmessage = this.messageRepository.create({
          content: questionValue,
          sessionId: id,
          senderType: 'bot',
          messageType: 'text',
        });
        await this.messageRepository.save(Botmessage); // 使用 await 等待保存操作完成
        this.res.end();
      } catch (error) {
        console.log('error:', error);
        this.res.write('error');
      }
    });
  }

  setResponse(res: Response) {
    this.res = res;
  }
}
