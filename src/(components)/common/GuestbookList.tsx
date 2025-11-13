"use client";

import { useState, useEffect } from "react";
import Button from "@/(components)/ui/Button";

export default function GuestbookList({ weddingId }: { weddingId: number }) {
  const [guestbooks, setGuestbooks] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/guestbook/${weddingId}`);
      if (!res.ok) {
        console.error("guestbook GET failed", res.status);
        setGuestbooks([]); // 안전처리
        return;
      }
      const data = await res.json();
      setGuestbooks(data);
    })();
  }, [weddingId]);

  const handleSubmit = async () => {
    await fetch(`/api/guestbook/${weddingId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, message }),
    });
    setMessage("");
    setName("");
    const res = await fetch(`/api/guestbook/${weddingId}`);
    setGuestbooks(await res.json());
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/guestbook/${weddingId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name }), // 비회원은 이름으로 본인 검증
    });
    setGuestbooks(guestbooks.filter((g) => g.id !== id));
  };

  return (
    <div className="mt-8 pt-4 px-8">
      {/* 입력 폼 */}
      <div className="flex flex-col gap-2 mb-4">
        <input
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />
        <textarea
          placeholder="내용을 입력하세요"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 rounded"
        />
        <Button onClick={handleSubmit}>등록</Button>
      </div>

      {/* 리스트 */}
      <ul className="flex flex-col gap-2">
        {guestbooks.map((g) => (
          <li
            key={g.id}
            className="relative px-4 py-3 text-left leading-6 bg-white/75 rounded-[8px] mb-[6px] shadow-[1px_1px_2px_rgba(0,0,0,0.1)]"
          >
            <div>
              <p className="font-semibold">{g.name}</p>
              <p className="text-sm">{g.message}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(g.createdAt).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => handleDelete(g.id)}
              className="absolute top-[5px] right-[5px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.7"
                strokeLinecap="round"
              >
                <line x1="3" y1="3" x2="9" y2="9" />
                <line x1="9" y1="3" x2="3" y2="9" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
