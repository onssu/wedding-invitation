"use client";

import { JSX, useMemo } from "react";

type Props = {
  groom: string;
  bride: string;
  date: string; // YYYY-MM-DD or YYYY.MM.DD
};

function parseDate(input: string): Date {
  const normalized = input.replace(/\./g, "-");
  return new Date(normalized);
}

export default function WeddingDayCountdown({ groom, bride, date }: Props) {
  const targetDate = useMemo(() => parseDate(date), [date]);
  const today = new Date();

  const oneDay = 1000 * 60 * 60 * 24;
  const diff = targetDate.getTime() - today.setHours(0, 0, 0, 0);
  const daysLeft = Math.ceil(diff / oneDay);

  let message: JSX.Element;

  if (daysLeft > 0) {
    message = (
      <>
        {groom}, {bride}의 결혼식이{" "}
        <span className="sm:text-lg font-semibold mx-1">{daysLeft}</span>일
        남았습니다.
      </>
    );
  } else if (daysLeft === 0) {
    message = (
      <>
        {groom}, {bride}의 결혼식이{" "}
        <span className="sm:text-lg font-semibold mx-1">오늘</span>
        입니다.
      </>
    );
  } else {
    message = (
      <>
        {groom}, {bride}의 결혼식이{" "}
        <span className="sm:text-lg font-semibold mx-1">
          {Math.abs(daysLeft)}
        </span>
        일 지났습니다.
      </>
    );
  }

  return (
    <div className="flex w-full justify-center text-center py-6">
      <p className=" text-foreground font-medium leading-relaxed">{message}</p>
    </div>
  );
}
