// robot 回复 的组件

import { OpenAIOutlined } from '@ant-design/icons';

export default function Answer() {
  return (
    // 回复信息超长 机器人头像 以及回复主体  头像靠左 信息最长为800px 适应容器宽度100% 同时换行
    <div className="flex items-center gap-3">
      {/* 头像 */}
      <div className="flex h-8 w-8 items-center justify-center self-start rounded-full bg-gray-200  ">
        <OpenAIOutlined
          style={{
            fontSize: '20px',
            color: 'black',
          }}
        />
      </div>
      <div className="w-[100%] max-w-[750px] rounded-xl bg-gray-200 p-4">
        <p className="text-[16px] text-[#000a]">
          这是一个回复信息 afasdfad这是一个回复信息 afasdfad 这是一个回复信息
          afasdfad 这是一个回复信息 afasdfad 这是一个回复信息 afasdfad
          这是一个回复信息 afasdfad 这是一个回复信息 afasdfad 这是一个回复信息
          afasdfad 这是一个回复信息 afasdfad 这是一个回复信息 afasdfad
          这是一个回复信息 afasdfad 这是一个回复信息 afasdfad
        </p>
      </div>
    </div>
  );
}
