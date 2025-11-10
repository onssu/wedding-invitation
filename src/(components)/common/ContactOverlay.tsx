// src/(components)/contact/ContactOverlay.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Person = {
  name: string;
  relation?: string; // 예: 아버지, 어머니, 신랑, 신부 등
  phone: string;
};

type ContactOverlayProps = {
  open: boolean;
  onClose: () => void;
  groomSide: Person[];
  brideSide: Person[];
  title?: string;
};

export default function ContactOverlay({
  open,
  onClose,
  groomSide,
  brideSide,
  title = "연락하기",
}: ContactOverlayProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Portal 마운트 확인
  useEffect(() => setMounted(true), []);

  // 배경 스크롤 잠금
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // ESC / 포커스 트랩
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();

      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<
          HTMLButtonElement | HTMLAnchorElement
        >('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        // 포커스 루프
        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // 진입 시 첫 포커스
    setTimeout(() => {
      dialogRef.current
        ?.querySelector<HTMLElement>('[data-autofocus="true"]')
        ?.focus();
    }, 0);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open || !mounted) return null;

  const normalize = (p: string) => p.replace(/[^\d+]/g, "");
  const telHref = (phone: string) => `tel:${normalize(phone)}`;
  const smsHref = (phone: string, body?: string) =>
    `sms:${normalize(phone)}${body ? `?body=${encodeURIComponent(body)}` : ""}`;

  const Section = ({ title, items }: { title: string; items: Person[] }) => (
    <section aria-labelledby={`${title}-label`} className="space-y-3">
      <h3
        id={`${title}-label`}
        className="text-sm font-semibold text-foreground/80"
      >
        {title}
      </h3>
      <ul className="grid grid-cols-1 gap-2">
        {items.map((p, idx) => (
          <li key={`${title}-${p.name}-${idx}`}>
            <div className="flex items-center justify-between rounded-2xl border border-border px-4 py-3">
              <div className="min-w-0">
                <div className="font-medium text-foreground truncate">
                  {p.name}
                  {p.relation ? (
                    <span className="ml-2 text-foreground/60 text-sm">
                      {p.relation}
                    </span>
                  ) : null}
                </div>
                <div className="text-sm text-foreground/60">{p.phone}</div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={telHref(p.phone)}
                  aria-label={`${p.name}에게 전화하기`}
                  className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-border hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <PhoneIcon className="h-5 w-5" />
                </a>
                <a
                  href={smsHref(p.phone)}
                  aria-label={`${p.name}에게 문자 보내기`}
                  className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-border hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <SmsIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );

  const overlayElement = (
    <div
      className="fixed inset-0 z-[1200]"
      aria-labelledby="contact-dialog-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <button
        aria-hidden="true"
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        tabIndex={-1}
      />

      {/* Panel */}
      <div className="absolute inset-0 flex items-end sm:items-center justify-center p-4">
        <div
          ref={dialogRef}
          className="w-full max-w-md rounded-2xl bg-card text-card-foreground shadow-xl ring-1 ring-border outline-none"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 id="contact-dialog-title" className="text-base font-semibold">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="h-9 w-9 grid place-items-center rounded-xl hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              data-autofocus="true"
              aria-label="닫기"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="px-5 py-4 space-y-6">
            <Section title="신랑측" items={groomSide} />
            <Section title="신부측" items={brideSide} />
          </div>
        </div>
      </div>
    </div>
  );

  // ✨ Portal로 body 밑에 렌더
  return createPortal(overlayElement, document.body);
}

/* ====== 아이콘 ====== */
function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6.6 2.9c.4-.4 1-.4 1.4 0l2.1 2.1c.4.4.4 1 0 1.4L9 7.5c.2.9.7 1.9 1.5 2.8.9.9 1.9 1.4 2.8 1.5l1.1-1.1c.4-.4 1-.4 1.4 0l2.1 2.1c.4.4.4 1 0 1.4l-1.3 1.3c-.5.5-1.2.8-1.9.8-2.8 0-5.6-1.3-7.9-3.6C4.7 10.4 3.4 7.6 3.4 4.8c0-.7.3-1.4.8-1.9L6.6 2.9z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SmsIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7A2.5 2.5 0 0 1 17.5 16H9l-4 4v-4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="10" r="1" fill="currentColor" />
      <circle cx="12" cy="10" r="1" fill="currentColor" />
      <circle cx="15" cy="10" r="1" fill="currentColor" />
    </svg>
  );
}

function CloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
