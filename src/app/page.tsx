"use client";

import Link from "next/link";

export default function Home() {
  const posts = [
    { seq: 1, title: "첫 번째 글" },
    { seq: 2, title: "두 번째 글" },
  ];

  return (
    <main className="flex flex-col items-center max-w-[100vw] w-[44rem] min-h-screen p-16 m-[auto]">
      {posts.map((post) => (
        <li key={post.seq} className="">
          <Link href={`/view/${post.seq}`}>{post.title}</Link>
        </li>
      ))}
      <hr />
      <Link href="/upload">등록</Link>
      <Link href="/example">예시</Link>
    </main>
  );
}
