import chatPubSub from '@/utils/PubSubManager';
import { ArrowUpOutlined, AudioOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
interface InputProps {
  onSend: (message: string) => void;
}
export default function Input({ onSend }: InputProps) {
  const [value, setValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  function send(content?: string) {
    if (!value) return;
    if (content) {
      onSend(content);
    } else {
      onSend(value);
    }
    setValue('');
  }
  function handdlePressEnter(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
    }

    if (e.shiftKey) {
      setValue((v) => v + '\n'); //如果按下shift+enter则换行
    } else if (value.trim()) {
      send();
    }
    setValue((v) => v.trim());
  }
  const handdlePub = (data: {
    content: string;
    senderType: string;
    messageType: string;
  }) => {
    send(data.content);
  };

  useEffect(() => {
    chatPubSub.on('sendMsg', handdlePub);
    return () => {
      // 组件卸载时取消订阅
      chatPubSub.off('sendMsg', handdlePub);
    };
  }, []);
  return (
    <div
      className="flex w-[100vw] max-w-[800px]  items-center justify-between gap-2 
    rounded-3xl bg-white/75 p-2
    backdrop-blur-lg backdrop-filter
    md:rounded-2xl
    "
    >
      <div
        className="
             flex  
             h-9 w-9 cursor-pointer items-center justify-center self-end justify-self-end rounded-full
             bg-white/75 p-2 shadow-sm  hover:bg-white/10 hover:shadow-md 
            
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
        onPressEnter={handdlePressEnter}
        prefix="fakdk"
      />
      <div
        className={`             
        flex h-9 w-9 cursor-pointer items-center justify-center self-end justify-self-end rounded-full
             bg-[#3333]  p-2 shadow-sm ${
               value ? 'bg-[white]/80 hover:shadow-md' : 'bg-[#3333]'
             } `}
        onClick={() => send()}
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
