import { Injectable } from '@nestjs/common';
// import { CreateChatDto } from './dto/create-chat.dto';
// import { UpdateChatDto } from './dto/update-chat.dto';
import { initUrl } from './init';
@Injectable()
export class ChatService {
  async chat(promt: string) {
    try {
      initUrl('你对于520这个节日的评价').then((res) => {
        console.log(res);
      });
      // console.log(res);
    } catch (e) {
      console.log(e);
      return `error: ${promt}`;
    }
  }
}
