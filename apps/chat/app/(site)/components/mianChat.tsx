import Input from '@/components/Input';
import { Flex } from 'antd';
import { useState } from 'react';
import Card from './Card';
import ChatContainer from './ChatContainer';
import Icon from './Icon';
import SelectOrigin from './selectOrigin';
import SwitchOrigin from './switchOrigin';
export default function MainChat({ className }: { className?: string }) {
  const [isChat, setChat] = useState(false);
  const [chatList, setChatList] = useState([] as any);

  async function addChat(message: string) {
    setChatList((prevChatList: any) => [
      ...prevChatList,
      { type: 'question', message },
    ]);
    const res = await fetch('http://localhost:3000/chat', {
      method: 'POST',
      body: JSON.stringify({ propmt: message }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.body) return;
    let mes = '';
    const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
    while (true) {
      var { value, done } = await reader.read();
      if (done) break;
      value = value?.replace('data', '');
      console.log('received data -', value);
      mes += value;
      // 将接收到的数据替换列表中的数据
      setChatList([...chatList, { type: 'answer', message: mes }]);
    }
  }

  return (
    <Flex className={`${className} w-full px-2 pt-2`} vertical>
      {isChat ? (
        <>
          <div className="mb-8 mt-8 flex items-center justify-center">
            <SwitchOrigin />
          </div>
          <Icon />
          <div className="mt-8 flex flex-row flex-wrap justify-center gap-4 p-4  sm:pt-8 md:gap-8">
            <Card />
            <Card />
            <Card className="hidden md:block" />
            <Card className="hidden md:block" />
          </div>
        </>
      ) : (
        <div className="relative flex h-screen w-full flex-col overflow-auto pt-10">
          <div className="absolute top-0 flex items-center justify-between">
            <SelectOrigin />
          </div>
          <div
            className="scrollbar-hide flex h-screen w-full justify-center 
            overflow-auto pb-20   pt-4
          "
          >
            <ChatContainer chatlist={chatList} />
            {/* <FloatButton.Group shape="circle" style={{ right: 54, bottom: 87 }}>
              <FloatButton.BackTop visibilityHeight={20} duration={2000} />
            </FloatButton.Group> */}
          </div>
          <div className="absolute bottom-8 flex w-full flex-col items-center justify-center">
            <Input onSend={addChat} />
          </div>
        </div>
      )}
    </Flex>
  );
}
