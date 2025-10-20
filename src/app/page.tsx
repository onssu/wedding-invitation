"use client";

import { Button } from "@/(components)/ui/Button";
import Link from "next/link";

export default function Home() {
  const posts = [
    { seq: 1, title: "첫 번째 글" },
    { seq: 2, title: "두 번째 글" },
  ];

  return (
    <main className="flex flex-col items-center">
      {/* ----------------- header ----------------- */}
      <Link href="/signin">로그인</Link>
      {/* ----------------- contents ----------------- */}
      {posts.map((post) => (
        <li key={post.seq} className="">
          <Link href={`/view/${post.seq}`}>{post.title}</Link>
        </li>
      ))}
      {/* ----------------- bottom ----------------- */}
      <div className="flex direction-row justify-space-around">
        <Link href="/detail">등록</Link>
        <Link href="/example">예시</Link>
      </div>
    </main>
  );
}
