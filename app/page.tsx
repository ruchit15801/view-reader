import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen">

      <Link
        href="/story/1"
        className="bg-purple-600 px-6 py-3 rounded"
      >
        Open Story
      </Link>

    </main>
  );
}