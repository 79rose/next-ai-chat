import { TagsOutlined } from '@ant-design/icons';

export default function Card({ className }: { className?: string }) {
  return (
    <div
      className={`"flex hover:shadow-md" h-24 w-44 flex-col gap-1  
     rounded-xl border bg-white/90 p-2  shadow-sm hover:cursor-pointer hover:bg-white/30 ${className}`}
    >
      <TagsOutlined
        style={{
          fontSize: '16px',
          color: '#4559a4',
        }}
      />
      <p className="text-[16px] font-[500] text-[#000a] ">
        帮我写一个贪吃蛇脚本
      </p>
    </div>
  );
}
