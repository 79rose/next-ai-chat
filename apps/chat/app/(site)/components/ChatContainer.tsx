import Answer from '@/components/Answer';

export default function ChatContainer() {
  // 聊天的容器 只需要展示聊天内容  只需要控制 容器最大宽度为 800px 同时 弹性收缩 控制滚动
  return (
    //   容器
    <div className="flex flex-col gap-4 overflow-y-auto pb-8 pt-4">
      {/* 消息 */}
      <Answer />
      <Answer />
      <Answer />
      <Answer />
      <Answer />
      <Answer />
      <Answer />
    </div>
  );
}
