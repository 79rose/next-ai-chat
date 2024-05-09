export const revalidate = 0;
import Button from './components/button';

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button />
      <h1 className="text-primarys">chat</h1>
    </div>
  );
}
