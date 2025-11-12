"use client";

import Button from "@/(components)/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  // const allPosts = useMemo(
  //   () => [
  //     { seq: 1, title: "첫 번째 글" },
  //     { seq: 2, title: "두 번째 글" },
  //     { seq: 3, title: "세 번째 글" },
  //     { seq: 4, title: "네 번째 글" },
  //     { seq: 5, title: "다섯 번째 글" },
  //     { seq: 6, title: "여섯 번째 글" },
  //     { seq: 7, title: "일곱 번째 글" },
  //     { seq: 8, title: "여덟 번째 글" },
  //     { seq: 9, title: "아홉 번째 글" },
  //     { seq: 10, title: "열 번째 글" },
  //     { seq: 11, title: "열한 번째 글" },
  //     { seq: 12, title: "열두 번째 글" },
  //   ],
  //   []
  // );

  // const [page, setPage] = useState(1);
  // const [pageSize, setPageSize] = useState(5);

  // const totalPages = Math.max(1, Math.ceil(allPosts.length / pageSize));

  // const posts = useMemo(() => {
  //   const start = (page - 1) * pageSize;
  //   return allPosts.slice(start, start + pageSize);
  // }, [allPosts, page, pageSize]);

  // const goPage = (p: number) => {
  //   const next = Math.min(Math.max(1, p), totalPages);
  //   setPage(next);
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // };

  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/wedding-data?page=1&pageSize=5", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("데이터 불러오기 실패");
        const json = await res.json();
        setAllPosts(json.data ?? []);
      } catch (err) {
        console.error("fetch error:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>로딩 중...</p>;

  return (
    <main className="flex flex-col items-center">
      {/* ----------------- header ----------------- */}
      {/* <Link href="/login">로그인</Link> */}
      {/* ----------------- contents ----------------- */}
      {/* <div className="w-full flex items-center justify-between gap-2 text-sm text-gray-600">
        <span className="ml-4">총 {allPosts.length}건</span>
        <label className="flex items-center gap-2">
          <span>페이지당</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            className="border rounded px-2 py-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          <span>개</span>
        </label>
      </div> */}

      <div className="w-full max-w-3xl h-full flex flex-col">
        {allPosts.length > 0 ? (
          <ul className="w-full space-y-4 flex-1">
            {allPosts.map((post) => (
              <li
                key={post.id}
                className="relative bg-white shadow-sm rounded-md p-4 flex justify-between items-center hover:shadow-md transition"
              >
                <Link
                  href={`/view/${post.id}`}
                  className="absolute inset-0 z-0"
                  aria-label={`글 보기 ${post.title}`}
                />
                <div className="w-full flex flex-row justify-between relative z-10">
                  <div className="text-xs text-gray-500 mt-1">{post.id}</div>
                  <span className="pl-2 text-lg font-medium text-gray-800">
                    {post.title}
                  </span>
                  <span>{post.createdAt}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            작성된 글이 없습니다.
          </div>
        )}
      </div>

      {/* ----------- pagination ----------- */}
      {/* <div className="flex items-center gap-2 pt-6">
        <button
          onClick={() => goPage(page - 1)}
          disabled={page === 1}
          className={`px-3 py-1 rounded border ${
            page === 1 ? "text-gray-400 border-gray-200" : "hover:bg-gray-100"
          }`}
        >
          이전
        </button>

        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;
            const isActive = pageNum === page;
            return (
              <button
                key={pageNum}
                onClick={() => goPage(pageNum)}
                className={`px-2 py-1 rounded text-sm ${
                  isActive
                    ? "bg-[#a77e51] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => goPage(page + 1)}
          disabled={page === totalPages}
          className={`px-3 py-1 rounded border ${
            page === totalPages
              ? "text-gray-400 border-gray-200"
              : "hover:bg-gray-100"
          }`}
        >
          다음
        </button>
      </div> */}
      {/* ----------------- bottom ----------------- */}
      <div className="w-full flex flex-row justify-between p-4">
        <Button
          primary
          type="button"
          onClick={() => router.push("/example")}
          aria-label="예시 페이지로 이동"
        >
          예시
        </Button>
        <Button
          primary
          type="button"
          onClick={() => router.push("/detail")}
          aria-label="청첩장 등록 페이지로 이동"
        >
          등록
        </Button>
      </div>
    </main>
  );
}
