import { AlignRightOutlined, WifiOutlined } from '@ant-design/icons';
import { Flex, Popover } from 'antd';
import { useState } from 'react';
import NewChat from './newChat';
import OldChat from './oldChat';
import User from './userslider';
export default function ChatSlider() {
  const [collapsed, setCollapsed] = useState(false);
  const closeContent = <div className="font-semibold">关闭</div>;
  const newContent = <div className="font-semibold">选择源</div>;

  const chatList = [
    {
      title: '说一下gpt-3',
      id: '1',
    },
    {
      title: '说一下gpt-4',
      id: '2',
    },
    {
      title: '说一下gpt-5',
      id: '3',
    },
    {
      title: '说一下gpt-6',
      id: '4',
    },
    {
      title: '说一下gpt-7',
      id: '5',
    },
    {
      title: '说一下gpt-8',
      id: '6',
    },
  ].map((chatInfo) => <OldChat key={chatInfo.id} chatInfo={chatInfo} />);

  return (
    <Flex
      vertical
      className="hide-scrollbar relative box-border h-full w-[260px] overflow-auto bg-white px-4 py-2 shadow-md"
    >
      <div className="mb-2 flex  items-center justify-between">
        <Popover content={closeContent} trigger="hover">
          <div className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-md p-4 hover:bg-gray-200">
            <AlignRightOutlined className=" scale-150 text-[#333b]" />
          </div>
        </Popover>
        <Popover content={newContent} trigger="hover">
          <div className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-md p-4 hover:bg-gray-200">
            <WifiOutlined className="scale-150 text-[#333b]" />
          </div>
        </Popover>
      </div>
      <NewChat className="mb-6" />
      <div>
        <div className="mb-2 ml-2 text-[12px] font-[500] text-[#3336]">
          今天
        </div>
        {chatList}
      </div>
      <div
        className="
      fixed bottom-2 w-[230px]
      "
      >
        <User></User>
      </div>
    </Flex>
  );
}
