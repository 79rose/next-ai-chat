import Answer from '@/components/Answer';
import Question from '@/components/Question';
import { FloatButton } from 'antd';
type message = {
  senderType: 'user' | 'bot';
  content: string;
};
interface ChatContainerProps {
  chatlist: message[];
}

export default function ChatContainer(props: ChatContainerProps) {
  // 聊天的容器 只需要展示聊天内容  只需要控制 容器最大宽度为 800px 同时 弹性收缩 控制滚动
  return (
    <>
      <div
        className="mx-auto flex  w-[100%] max-w-[800px]  flex-col gap-4
      overflow-y-auto rounded-lg  pb-8  pt-4
      "
      >
        {props.chatlist.map((item, index) => {
          if (item.senderType === 'user') {
            return <Question key={index} question={item.content} />;
          } else {
            return <Answer key={index} answer={item.content} />;
          }
        })}
      </div>
      <FloatButton.Group shape="circle" style={{ right: 100, bottom: 87 }}>
        <FloatButton.BackTop visibilityHeight={20} duration={2000} />
      </FloatButton.Group>
    </>
  );
}
