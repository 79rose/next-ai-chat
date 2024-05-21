export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>
        <h1>user</h1>
        {children}
      </div>
    </>
  );
}
