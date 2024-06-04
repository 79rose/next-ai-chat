import { OpenAIOutlined } from '@ant-design/icons';

interface AnswerProps {
  answer: string;
}
export default function Answer({ answer }: AnswerProps) {
  return (
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
      <div className="w-[content] max-w-[750px] rounded-xl bg-gray-200 p-4">
        <p className="text-[16px] text-[#000a]">{answer}</p>
      </div>
    </div>
  );
}
