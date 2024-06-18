import { Chat } from '@/api';
import useChatStore from '@/hooks/useChat';
import useSlider from '@/hooks/useSlider';
import useUserStore from '@/hooks/useUser';
import { AlignRightOutlined } from '@ant-design/icons';
import { Flex, Popover } from 'antd';
import { useEffect, useState } from 'react';
import NewChat from './newChat';
import OldChat from './oldChat';
import User from './userslider';
export default function ChatSlider() {
  const { onOpen, onClose } = useSlider();
  const isOpen = useSlider((state) => state.isOpen);
  const { setCurrentSessionId, setCurrentSessionList } = useChatStore();
  const [chatList, setChatList] = useState<any[]>([]);
  const storeList = useChatStore((state) => state.currentSessionList);
  const closeContent = <div className="font-semibold">关闭</div>;
  const { userId } = useUserStore();
  // const chatList = [].map((chatInfo) => (
  //   <OldChat key={chatInfo.id} chatInfo={chatInfo} />
  // ));
  const fetchData = async () => {
    if (!userId) {
      return;
    }
    try {
      const { data } = await Chat.getAllListByUserId(userId!);
      setCurrentSessionList(data.list);
      setCurrentSessionId(data.list[0].id);
      setChatList(data.list);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [userId]);
  useEffect(() => {
    setChatList(storeList);
  }, [storeList]);
  return (
    isOpen && (
      <Flex
        vertical
        className="hide-scrollbar relative box-border h-full w-[260px] overflow-auto bg-white px-4 py-2 shadow-md"
      >
        <div className="mb-2 flex  items-center justify-between">
          <Popover content={closeContent} trigger="hover">
            <div className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-md p-4 hover:bg-gray-200">
              <AlignRightOutlined
                className=" scale-150 text-[#333b]"
                onClick={onClose}
              />
            </div>
          </Popover>
        </div>
        <NewChat className="mb-6" />
        <div>
          <div className="mb-2 ml-2 text-[12px] font-[500] text-[#3336]">
            今天
          </div>
          {chatList.map((chatInfo) => (
            <OldChat key={chatInfo.id} chatInfo={chatInfo} />
          ))}
        </div>
        <div
          className="
      fixed bottom-2 w-[230px]
      "
        >
          <User></User>
        </div>
      </Flex>
    )
  );
}
