import useChatStore from '@/hooks/useChat';
import chatPubSub from '@/utils/PubSubManager';
import { TagsOutlined } from '@ant-design/icons';
interface CardProps {
  content: string;
  className?: string;
}
export default function Card({ content, className }: CardProps) {
  const { setIsChat } = useChatStore();
  const handdleclick = () => {
    setIsChat(true);
    //执行chat发送消息事件
    chatPubSub.emit('sendMsg', {
      content,
      senderType: 'user',
      messageType: 'text',
    });
    chatPubSub.emit('newSession');
  };
  return (
    <div
      className={`"flex hover:shadow-md" w-46 h-24 flex-col gap-1  
     rounded-xl border bg-white/90 p-2  shadow-sm hover:cursor-pointer hover:bg-white/30 ${className}`}
      onClick={handdleclick}
    >
      <TagsOutlined
        style={{
          fontSize: '16px',
          color: '#4559a4',
        }}
      />
      <p className="mt-1 text-[16px] font-[800] text-[#000a]">{content}</p>
    </div>
  );
}
