"use client";

import { useState } from "react";

export default function WeddingMessageAI() {
  const [style, setStyle] = useState("감성적인");
  const [keyword, setKeyword] = useState("");
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setErr("");
    setItems([]);

    try {
      const res = await fetch("/api/wedding-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ style, relationship, keyword, count }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErr(data?.message || "생성 실패");
        return;
      }
      setItems(data.items || []);
    } catch (e: any) {
      setErr(e?.message || "요청 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">💌 청첩장 문구 AI (Gemini)</h2>

      <div className="grid gap-3 mb-4">
        <label className="flex items-center gap-2">
          <span className="w-20">문체</span>
          <select
            className="border rounded p-2 flex-1"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
          >
            <option value="감성적인">감성적인</option>
            <option value="유쾌한">유쾌한</option>
            <option value="격식있는">격식있는</option>
            <option value="담백한">담백한</option>
          </select>
        </label>

        <label className="flex items-center gap-2">
          <span className="w-20">키워드</span>
          <input
            className="border rounded p-2 flex-1"
            placeholder="예: 봄, 제주, 첫눈"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </label>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
        >
          {loading ? "생성 중..." : "문구 추천받기"}
        </button>
      </div>

      {err && <div className="text-red-600 text-sm mb-3">오류: {err}</div>}

      {!!items.length && (
        <div className="mt-4 bg-gray-50 p-4 rounded space-y-3">
          {items.map((line, idx) => (
            <p key={idx} className="whitespace-pre-line leading-relaxed">
              {line}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
