import { ArrowUpOutlined, AudioOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';

// chat input
export default function Input() {
  const [value, setValue] = useState('');
  return (
    <div
      className="flex w-[100vw] max-w-[800px] items-center justify-between gap-2 rounded-2xl 
    bg-white/80 p-2
    backdrop-blur-lg backdrop-filter"
    >
      <div
        className="
             flex  
             h-9 w-9 cursor-pointer items-center justify-center self-end justify-self-end rounded-full
             bg-white/80 p-2 shadow-sm  hover:bg-white/10 hover:shadow-md 
              "
      >
        <AudioOutlined
          style={{
            fontSize: '20px',
            color: 'purple',
          }}
          className="
                transition-transform duration-200 ease-in-out hover:scale-[1.3]
                  "
        />
      </div>
      <TextArea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="向讯飞星火发送信息"
        autoSize={{ minRows: 1, maxRows: 5 }}
        onPressEnter={() => {
          console.log(value);
        }}
        prefix="fakdk"
      />
      <div
        className={`             flex  
             h-9 w-9 cursor-pointer items-center justify-center self-end justify-self-end rounded-full
             bg-[#3333]  p-2 shadow-sm ${
               value ? 'bg-[white]/80 hover:shadow-md' : 'bg-[#3333]'
             } `}
      >
        <ArrowUpOutlined
          style={{
            fontSize: '20px',
            color: value ? 'purple' : 'white',
          }}
          className={`transition-transform duration-200 ease-in-out hover:scale-[1.3]`}
        />
      </div>
    </div>
  );
}
