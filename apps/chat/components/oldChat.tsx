import useActiveChatStore from '@/hooks/useActiveChat';
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { Dropdown, Input, MenuProps } from 'antd';
import { useState } from 'react';
interface ChatInfo {
  title: string;
  id: string;
}
export default function OldChat({ chatInfo }: { chatInfo: ChatInfo }) {
  const { activeChat, setActiveChat } = useActiveChatStore();
  const [renameValue, setRenameValue] = useState(chatInfo.title ?? '');
  const [isRename, setIsRename] = useState(false);
  const items: MenuProps['items'] = [
    {
      label: (
        <div
          className="flex items-center justify-start gap-2 font-semibold"
          onClick={renameChat}
        >
          <EditOutlined />
          <span>重命名</span>
        </div>
      ),
      key: 'setName',
    },
    {
      label: (
        <div
          className="flex items-center justify-start gap-2 font-semibold"
          onClick={deleteChat}
        >
          <DeleteOutlined />
          <span>删除</span>
        </div>
      ),
      key: '1',
    },
  ];
  function deleteChat() {}
  function renameChat() {
    setIsRename(true);
  }
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRenameValue(e.target.value);
  };
  const onPressEnter = () => {
    setIsRename(false);
  };
  return (
    <div
      className={`group flex cursor-pointer items-center rounded-lg p-2 hover:bg-gray-100 ${
        activeChat === chatInfo.id ? 'bg-gray-100' : ''
      }`}
      onClick={() => setActiveChat(chatInfo.id)}
    >
      {!isRename && (
        <>
          <div className="font-500 mr-auto overflow-hidden text-clip text-[16px] ">
            {renameValue}
          </div>
          <div
            className={`${
              activeChat === chatInfo.id ? '' : 'hidden'
            }  hover:backdrop-blur group-[hover]:visible `}
          >
            <Dropdown menu={{ items }} trigger={['click']}>
              <MoreOutlined
                rotate={90}
                className="h-[20px] w-[20px] hover:scale-150 hover:text-black"
              />
            </Dropdown>
          </div>
        </>
      )}
      {isRename && (
        <Input
          value={renameValue}
          onChange={onChange}
          onPressEnter={onPressEnter}
        />
      )}
    </div>
  );
}
