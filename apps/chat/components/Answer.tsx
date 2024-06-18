import { OpenAIOutlined } from '@ant-design/icons';
import MDEditor from '@uiw/react-md-editor';

interface AnswerProps {
  answer: string;
}
export default function Answer({ answer }: AnswerProps) {
  return (
    <div
      className="flex  items-center gap-3 
    pr-4 md:pr-0
    "
    >
      <div className="flex h-8 w-8 items-center justify-center self-start rounded-full bg-gray-200  ">
        <OpenAIOutlined
          style={{
            fontSize: '20px',
            color: 'black',
          }}
        />
      </div>
      <div className="relative w-[content] max-w-[760px] cursor-pointer rounded-xl bg-white p-4">
        <MDEditor.Markdown source={answer} className="markdown-body" />
        {/* <div className="absolute bottom-[-75%] right-4">
          <OpenAIOutlined
            style={{
              fontSize: '20px',
              color: 'black',
            }}
          />
        </div> */}
      </div>
    </div>
  );
}
