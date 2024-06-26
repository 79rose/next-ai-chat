'use client';
import useAuthModal from '@/hooks/useAuthModal';
import useChatStore from '@/hooks/useChat';
import useSettingModal from '@/hooks/useSettingModal';
import useUserStore from '@/hooks/useUser';
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, MenuProps } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
export default function User() {
  const { isLogin, logout, setToken, userImg, userName } = useUserStore();
  const { onOpen } = useAuthModal();
  const { onOpen: settingOpen } = useSettingModal();
  const { setCurrentChatList, setCurrentSessionList } = useChatStore();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    setToken('');
    setCurrentChatList([]);
    setCurrentSessionList([]);
  };
  const goToUserCenter = () => {
    router.push('/user');
  };
  const items: MenuProps['items'] = [
    {
      label: (
        <div
          className="flex items-center justify-start gap-2 font-semibold"
          onClick={settingOpen}
        >
          <SettingOutlined />
          <span>设置</span>
        </div>
      ),
      key: 'setName',
    },
    {
      label: (
        <div
          className="flex items-center justify-start gap-2 font-semibold"
          onClick={goToUserCenter}
        >
          <LogoutOutlined />
          <span>个人中心</span>
        </div>
      ),
      key: '1',
    },
    {
      label: (
        <div
          className="flex items-center justify-start gap-2 font-semibold"
          onClick={handleLogout}
        >
          <LogoutOutlined />
          <span>logout</span>
        </div>
      ),
      key: '2',
    },
  ];
  useEffect(() => {
    console.log(isLogin, userImg);
  }, [isLogin, userImg]);
  return (
    <>
      <div
        className="flex w-[full] cursor-pointer gap-2 rounded-md bg-gray-100/80
       px-2 py-2 text-[18px] hover:bg-gray-200/80 "
      >
        {isLogin ? (
          <>
            <Dropdown menu={{ items }} trigger={['click']}>
              <Avatar size={40} src={userImg}></Avatar>
            </Dropdown>
            <h1 className="pt-[1px] text-[20px] font-semibold text-black">
              {userName}
            </h1>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <Avatar size={40} onClick={onOpen}>
              未登录
            </Avatar>
          </div>
        )}
      </div>
    </>
  );
}
