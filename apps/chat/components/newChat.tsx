import { Chat } from '@/api';
import useChatStore from '@/hooks/useChat';
import useUserStore from '@/hooks/useUser';
import chatPubSub from '@/utils/PubSubManager';
import { FormOutlined, OpenAIOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
export default function NewChat({ className }: { className?: string }) {
  const newContent = <div className="font-semibold">新聊天</div>;
  const { userId } = useUserStore();
  const { setCurrentSessionId, setCurrentSessionList } = useChatStore();
  const currentSessionList = useChatStore((state) => state.currentSessionList);
  const newChat = async () => {
    try {
      const { data } = await Chat.createSession(+userId!);
      console.log(data);
      setCurrentSessionId(data.id);
      setCurrentSessionList([
        { id: data.id, title: data.title },
        ...currentSessionList,
      ]);
      toast.success('新聊天创建成功');
    } catch (error) {
      toast.error(error?.message || '新聊天创建失败');
    }
  };
  const handdlePublish = () => {
    if (currentSessionList.length === 0) {
      newChat();
    }
  };
  useEffect(() => {
    chatPubSub.on('newSession', handdlePublish);
    return () => {
      chatPubSub.off('newSession', handdlePublish);
    };
  }, []);
  return (
    <div
      className={`group flex cursor-pointer items-center rounded-md p-2 hover:bg-gray-200 ${className}`}
    >
      <div>
        <OpenAIOutlined
          style={{
            fontSize: '20px',
            color: 'black',
          }}
        />
      </div>
      <div className=" mx-auto ml-2 scale-110 font-semibold">新聊天</div>
      <div className="group-[hover]:visible" onClick={newChat}>
        <Popover content={newContent} trigger="hover" placement="right">
          <FormOutlined
            className="h-[20px] w-[20px] hover:scale-125 hover:text-black"
            style={{
              fontSize: '20px',
              color: 'purple',
            }}
          />
        </Popover>
      </div>
    </div>
  );
}
