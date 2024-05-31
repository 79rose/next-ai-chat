import { DownOutlined, TwitchOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Switch } from 'antd';
import React from 'react';

let focus = false;
function onOpenChange(val: boolean) {
  focus = val;
}
const items: MenuProps['items'] = [
  {
    label: (
      <div
        className="
      flex w-48 items-center justify-between px-1 py-2 font-semibold
      "
      >
        <div className="flex items-center gap-1">
          <TwitchOutlined />
          <span>讯飞星火</span>
        </div>
      </div>
    ),
    key: '0',
  },
  {
    type: 'divider',
  },
  {
    label: (
      <div
        className="
      flex items-center justify-between px-1 py-2 font-semibold
      "
      >
        <div className="flex items-center gap-1">
          <TwitchOutlined />
          <span>临时聊天</span>
        </div>
        <Switch size="small" />
      </div>
    ),
    key: '2',
  },
];

const App: React.FC = () => (
  <Dropdown menu={{ items }} trigger={['click']} onOpenChange={onOpenChange}>
    <a
      onClick={(e) => e.preventDefault()}
      className={`
                "inline-flex text-[#7d7d7d]" items-center gap-1 rounded-md rounded-l-lg 
       px-2 py-2 font-[1000] hover:bg-[#fffe] ${focus ? 'bg-[#fffe]' : ''}
        `}
    >
      <span className="text-xl font-semibold text-[#7d7d7d]">NowChat </span>
      <DownOutlined style={{ color: '#7d7d7d' }} />
    </a>
  </Dropdown>
);

export default App;
