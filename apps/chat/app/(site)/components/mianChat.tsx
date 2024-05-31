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
            <ChatContainer></ChatContainer>
            {/* <FloatButton.Group shape="circle" style={{ right: 54, bottom: 87 }}>
              <FloatButton.BackTop visibilityHeight={20} duration={2000} />
            </FloatButton.Group> */}
          </div>
          <div className="absolute bottom-8 flex w-full flex-col items-center justify-center">
            <Input />
          </div>
        </div>
      )}
    </Flex>
  );
}
