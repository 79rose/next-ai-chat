import { Chat } from '@/api';
import useChatStore from '@/hooks/useChat';
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { Dropdown, Input, MenuProps } from 'antd';
import { useState } from 'react';
import toast from 'react-hot-toast';
interface ChatInfo {
  title: string;
  id: string;
}
export default function OldChat({ chatInfo }: { chatInfo: ChatInfo }) {
  const { setCurrentSessionId, setCurrentSessionList } = useChatStore();
  const activeSessionId = useChatStore((state) => state.currentSessionId);
  const [renameValue, setRenameValue] = useState(chatInfo.title ?? '');
  const currentChatList = useChatStore((state) => state.currentSessionList);
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
  async function deleteChat() {
    try {
      const { data } = await Chat.deleteSession(+chatInfo.id);
      setCurrentSessionList(
        currentChatList.filter((item) => item.id !== chatInfo.id)
      );
      if (
        currentChatList[0].id === +chatInfo.id &&
        currentChatList.length > 1
      ) {
        setCurrentSessionId(currentChatList[1].id);
      } else {
        setCurrentSessionId(currentChatList[0].id);
      }
      toast.success('删除成功');
    } catch (error) {
      console.log(error);
      toast.error('删除失败');
    }
  }
  function renameChat() {
    setIsRename(true);
  }
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRenameValue(e.target.value);
  };
  const onPressEnter = async () => {
    try {
      const { data } = await Chat.updateSessionTitle(+chatInfo.id, renameValue);
      console.log(data);
      toast.success('重命名成功');
    } catch (error) {
      console.log(error);
      toast.error('重命名失败');
    }
    setIsRename(false);
  };
  return (
    <div
      className={`group flex cursor-pointer items-center rounded-lg p-2 hover:bg-gray-100 ${
        activeSessionId === chatInfo.id ? 'bg-gray-100' : ''
      }`}
      onClick={() => setCurrentSessionId(chatInfo.id)}
    >
      {!isRename && (
        <>
          <div className="font-500 mr-auto overflow-hidden text-clip text-[16px] ">
            {renameValue}
          </div>
          <div
            className={`${
              activeSessionId === chatInfo.id ? '' : 'hidden'
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
