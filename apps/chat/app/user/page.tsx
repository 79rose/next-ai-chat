import Main from './components/main';

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center bg-gray-200">
        <Main />
        {children}
      </div>
    </>
  );
}
