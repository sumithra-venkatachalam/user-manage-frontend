import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">User Directory</h1>
      <Link href="/users" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
        Go to Users
      </Link>
    </div>
  );
}
