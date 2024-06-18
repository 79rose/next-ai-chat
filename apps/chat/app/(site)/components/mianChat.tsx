'use client';

import { Chat } from '@/api';
import Input from '@/components/Input';
import useChatStore from '@/hooks/useChat';
import useUserStore from '@/hooks/useUser';
import { Flex } from 'antd';
import { useEffect, useState } from 'react';
import Card from './Card';
import ChatContainer from './ChatContainer';
import Icon from './Icon';
import SelectOrigin from './selectOrigin';
import SwitchOrigin from './switchOrigin';
export default function MainChat({ className }: { className?: string }) {
  const isChat = useChatStore((state) => state.isChat);
  const token = useUserStore((state) => state.token);
  const sessionId = useChatStore((state) => state.currentSessionId);
  const { setCurrentChatList } = useChatStore();
  const currentChatList = useChatStore((state) => state.currentChatList);
  const [chatList, setChatList] = useState(currentChatList);
  async function addChat(message: string) {
    setChatList((prevChatList: any) => [
      ...prevChatList,
      { senderType: 'user', content: message },
    ]);
    setCurrentChatList([...currentChatList, { type: 'question', message }]);
    const res = await fetch('http://localhost:3000/chat', {
      method: 'POST',
      body: JSON.stringify({
        promt: message,
        id: sessionId,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.body) return;
    let mes = '';
    const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
    while (true) {
      var { value, done } = await reader.read();
      if (done) break;
      value = value?.replace('data', '');
      setChatList((prevChatList: any) => [
        ...prevChatList.filter((_item, index) => {
          return (
            index !== prevChatList.length - 1 || _item.senderType === 'user'
          );
        }),
        { senderType: 'bot', content: mes },
      ]);
      mes += value;
    }
    setCurrentChatList([
      ...currentChatList,
      { senderType: 'bot', content: mes },
    ]);
  }
  const fetchData = async () => {
    try {
      const { data } = await Chat.getMessageListBySessionId(+sessionId);
      setCurrentChatList(data.list);
      setChatList(data.list);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [sessionId]);
  return (
    <Flex className={`${className} w-full px-2 pt-2`} vertical>
      {chatList.length === 0 && !isChat ? (
        <>
          <div className="mb-8 mt-8 flex items-center justify-center">
            <SwitchOrigin />
          </div>
          <Icon />
          <div className="mt-8 flex flex-row flex-wrap justify-center gap-4 p-4  sm:pt-8 md:gap-8">
            <Card content="介绍一下深圳技术大学" />
            <Card content="帮我写一个贪吃蛇脚本" />
            <Card className="hidden md:block" content="预测一下nba今年的冠军" />
            <Card className="hidden md:block" content="介绍一下数据库系统" />
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
          </div>
          <div className="absolute bottom-8 flex w-full flex-col items-center justify-center">
            <Input onSend={addChat} />
          </div>
        </div>
      )}
    </Flex>
  );
}
