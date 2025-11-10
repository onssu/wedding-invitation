// src/components/AccountAccordion.tsx
"use client";

import { useState } from "react";

type AccountItem = {
  name: string;
  bank: string;
  account: string;
};

type Group = {
  id: string;
  title: string; // "신랑측" | "신부측" ...
  items: AccountItem[];
  defaultOpen?: boolean;
};

type Props = {
  overline?: string; // ACCOUNT
  heading?: string; // 마음 전하실 곳
  description?: string; // 여러 줄 가능 (\n)
  groups: Group[];
};

export default function AccountAccordion({
  overline = "ACCOUNT",
  heading = "마음 전하실 곳",
  description = "참석이 어려우신 분들을 위해\n계좌번호를 기재하였습니다.\n너그러운 마음으로 양해 부탁드립니다.",
  groups,
}: Props) {
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    groups.reduce((acc, g) => {
      acc[g.id] = g.defaultOpen ?? false;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const toggle = (id: string) => setOpen((s) => ({ ...s, [id]: !s[id] }));

  const copy = async (full: string) => {
    try {
      await navigator.clipboard.writeText(full.replace(/\s+/g, ""));
      alert("계좌번호가 복사되었습니다.");
    } catch {
      alert("복사에 실패했습니다. 길게 눌러 복사해주세요.");
    }
  };

  return (
    <section className="px-4 py-8">
      {/* 상단 안내 */}
      <div className="text-center mb-6">
        <p className="text-[10px] tracking-[0.25em] text-foreground/50">
          {overline}
        </p>
        <h2 className="mt-1 text-lg font-semibold">{heading}</h2>
        <p className="mt-3 text-sm text-foreground/70 leading-relaxed whitespace-pre-line">
          {description}
        </p>
      </div>

      {/* 아코디언 그룹 */}
      <div className="space-y-4">
        {groups.map((g) => {
          const isOpen = !!open[g.id];
          const regionId = `acc-${g.id}`;

          return (
            <div
              key={g.id}
              className="rounded-2xl bg-muted/40 border border-border shadow-sm"
            >
              {/* 헤더 */}
              <button
                type="button"
                aria-controls={regionId}
                aria-expanded={isOpen}
                onClick={() => toggle(g.id)}
                className="flex w-full items-center justify-between px-4 py-3 rounded-t-2xl"
              >
                <span className="text-sm font-semibold">{g.title}</span>
                <span
                  className={[
                    "text-foreground/60 transition-transform",
                    isOpen ? "rotate-0" : "-rotate-180",
                  ].join(" ")}
                  aria-hidden
                >
                  ▴
                </span>
              </button>

              {/* 내용 */}
              <div
                id={regionId}
                role="region"
                className={[
                  "overflow-hidden transition-[max-height] duration-700",
                  isOpen ? "max-h-[1000px]" : "max-h-0",
                ].join(" ")}
              >
                <ul className="px-2 pb-2">
                  {g.items.map((it, i) => (
                    <li
                      key={i}
                      className="mt-2 first:mt-0 rounded-xl border border-border bg-card"
                    >
                      <button
                        onClick={() => copy(`${it.bank} ${it.account}`)}
                        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-secondary/60 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-label={`${it.name} 계좌 복사`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <ClipboardIcon className="h-4 w-4 text-foreground/60" />
                          <span className="font-medium truncate">
                            {it.name}
                          </span>
                        </div>
                        <div className="text-sm text-foreground/70 shrink-0">
                          {it.bank}{" "}
                          <span className="tabular-nums">{it.account}</span>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ClipboardIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M9 4h6a2 2 0 012 2v1h1a2 2 0 012 2v9a2 2 0 01-2 2H8a2 2 0 01-2-2V9a2 2 0 012-2h1V6a2 2 0 012-2z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M9 7h6V6a1 1 0 00-1-1h-4a1 1 0 00-1 1v1z" fill="currentColor" />
    </svg>
  );
}
