import Answer from '@/components/Answer';
import Question from '@/components/Question';
type message = {
  type: 'question' | 'answer';
  message: string;
};
interface ChatContainerProps {
  chatlist: message[];
}

export default function ChatContainer(props: ChatContainerProps) {
  // 聊天的容器 只需要展示聊天内容  只需要控制 容器最大宽度为 800px 同时 弹性收缩 控制滚动
  return (
    //   容器
    <div className="flex w-[70%]  flex-col gap-4 overflow-y-auto  pb-8 pt-4">
      {props.chatlist.map((item, index) => {
        if (item.type === 'question') {
          return <Question key={index} question={item.message} />;
        } else {
          return <Answer key={index} answer={item.message} />;
        }
      })}
    </div>
  );
}
