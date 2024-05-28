import useAuthModal from '@/hooks/useAuthModal';
import useSettingModal from '@/hooks/useSettingModal';
import useUserStore from '@/hooks/useUser';
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, MenuProps } from 'antd';
export default function User() {
  const { isLogin, logout, setToken, userImg, userName } = useUserStore();
  const { onOpen } = useAuthModal();
  const { onOpen: settingOpen } = useSettingModal();

  const handleLogout = () => {
    logout();
    setToken('');
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
          onClick={handleLogout}
        >
          <LogoutOutlined />
          <span>logout</span>
        </div>
      ),
      key: '1',
    },
  ];
  return (
    <>
      <div
        className="flex w-[full] cursor-pointer gap-2 rounded-md bg-gray-100
       px-2 py-2 text-[18px] hover:bg-gray-200"
      >
        {isLogin ? (
          <>
            <Dropdown menu={{ items }} trigger={['click']}>
              <Avatar size={40}>{userImg}</Avatar>
            </Dropdown>
            <h1>{userName}</h1>
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
