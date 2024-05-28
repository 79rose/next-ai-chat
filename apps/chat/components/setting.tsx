import {
  DeleteOutlined,
  ExportOutlined,
  ImportOutlined,
} from '@ant-design/icons';
import { Button, Divider, Tabs } from 'antd';
import React from 'react';
function Setting() {
  return (
    <div className="flex flex-col  items-center justify-center">
      <div className="flex w-full items-center  justify-between text-xl font-semibold">
        <span>导出聊天</span>
        <Button icon={<ExportOutlined />}></Button>
      </div>
      <Divider />
      <div className="flex w-full  items-center justify-between text-xl font-semibold">
        <span>导入聊天</span>
        <Button icon={<ImportOutlined />}></Button>
      </div>
      <Divider />
      <div className="flex w-full  items-center justify-between text-xl font-semibold">
        <span>删除所有聊天</span>
        <Button danger icon={<DeleteOutlined />}></Button>
      </div>
    </div>
  );
}

const App: React.FC = () => (
  <Tabs
    defaultActiveKey="1"
    items={[
      {
        key: '1',
        label: `通用设置`,
        children: <Setting />,
      },
    ]}
  />
);

export default App;
