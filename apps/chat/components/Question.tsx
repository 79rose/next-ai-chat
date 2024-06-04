export default function Question({ question }: { question: string }) {
  return (
    <div className="ml-auto flex items-center gap-3">
      <div className="w-[100%] max-w-[550px] rounded-xl bg-gray-200 p-4">
        <p className="text-[16px] text-[#000a]">{question}</p>
      </div>
    </div>
  );
}
