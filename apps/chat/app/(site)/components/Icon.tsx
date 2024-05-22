import { OpenAIOutlined } from '@ant-design/icons';

export default function Icon() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <OpenAIOutlined style={{ fontSize: '60px' }} />
      <div className="text-lg font-[600]">欢迎使用，请描述您的问题</div>
    </div>
  );
}
