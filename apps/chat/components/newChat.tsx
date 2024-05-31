import { FormOutlined, OpenAIOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
export default function NewChat({ className }: { className?: string }) {
  const newContent = <div className="font-semibold">新聊天</div>;
  function newChat() {
    console.log('新建会话');
  }
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
