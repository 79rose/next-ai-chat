import { Injectable } from '@nestjs/common';
import { xfxh } from './model/xfxh';
import { Response } from 'express';
@Injectable()
export class ChatService {
  private res: Response;
  async chat(promt: string) {
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
    sock.on('close', () => {
      console.log('讯飞星火连接sock关闭!!!!');
      // 返回问题值
      this.res.end();
      return Promise.resolve(questionValue);
    });
  }

  setResponse(res: Response) {
    this.res = res;
  }
}
