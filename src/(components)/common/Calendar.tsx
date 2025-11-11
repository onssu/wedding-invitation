// src/(components)/calendar/StaticKRCalendar.tsx
type Holiday = { date: string; name: string }; // "YYYY-MM-DD"

// (필요 시 여기에 음력 공휴일 등 추가)
// 예: 2027 예시값 - 필요 없으면 빈 배열 유지
const EXTRA_HOLIDAYS: Holiday[] = [
  // { date: "2027-02-08", name: "설연휴" },
  // { date: "2027-02-09", name: "설날" },
  // { date: "2027-02-10", name: "설연휴" },
  // { date: "2027-09-21", name: "추석연휴" },
  // { date: "2027-09-22", name: "추석" },
  // { date: "2027-09-23", name: "추석연휴" },
];

// 고정(양력) 공휴일
const FIXED_HOLIDAYS = [
  { mmdd: "01-01", name: "신정" },
  { mmdd: "03-01", name: "삼일절" },
  { mmdd: "05-05", name: "어린이날" },
  { mmdd: "06-06", name: "현충일" },
  { mmdd: "08-15", name: "광복절" },
  { mmdd: "10-03", name: "개천절" },
  { mmdd: "10-09", name: "한글날" },
  { mmdd: "12-25", name: "성탄절" },
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}
function fmtDate(y: number, m: number, d: number) {
  return `${y}-${pad(m)}-${pad(d)}`;
}
function parseInputDate(input: string) {
  // "YYYY.MM.DD" 또는 "YYYY-MM-DD"
  const t = input.includes(".") ? input.split(".") : input.split("-");
  const y = Number(t[0]);
  const m = Number(t[1]);
  const d = Number(t[2]);
  return new Date(y, m - 1, d); // 문자열 파싱 대신 로컬 생성 (TZ 안전)
}
function getDaysInMonth(y: number, m1_12: number) {
  return new Date(y, m1_12, 0).getDate();
}
function isSunday(date: Date) {
  return date.getDay() === 0;
}

function buildFixedHolidaysForYear(year: number): Holiday[] {
  const out: Holiday[] = [];
  for (const fh of FIXED_HOLIDAYS) {
    const [mm, dd] = fh.mmdd.split("-");
    const d = new Date(year, Number(mm) - 1, Number(dd));
    const dateStr = fmtDate(year, Number(mm), Number(dd));
    out.push({ date: dateStr, name: fh.name });

    // 대체공휴일: 해당일이 일요일이면 다음 월요일
    if (isSunday(d)) {
      const alt = new Date(d);
      alt.setDate(alt.getDate() + 1);
      out.push({
        date: fmtDate(alt.getFullYear(), alt.getMonth() + 1, alt.getDate()),
        name: `${fh.name} 대체공휴일`,
      });
    }
  }
  return out;
}

export default function Calendar({ date }: { date: string }) {
  const selected = parseInputDate(date);
  const year = selected.getFullYear();
  const month = selected.getMonth() + 1; // 1~12
  const day = selected.getDate();

  // 공휴일 맵 구성(이 해의 고정 공휴일 + 내부 추가 공휴일)
  const holidayMap = new Map<string, string>();
  for (const h of buildFixedHolidaysForYear(year))
    holidayMap.set(h.date, h.name);
  for (const h of EXTRA_HOLIDAYS) {
    if (h.date.startsWith(String(year))) holidayMap.set(h.date, h.name);
  }

  const days = getDaysInMonth(year, month);
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay(); // 0:일~6:토

  // 달력 그리드 생성(6주 보장 X, 필요한 만큼 행 생성)
  const cells: Array<{
    y: number;
    m: number;
    d: number | null;
    dateStr?: string;
    holidayName?: string;
  }> = [];

  // 앞쪽 빈칸
  for (let i = 0; i < firstDayOfWeek; i++) {
    cells.push({ y: year, m: month, d: null });
  }
  // 실제 날짜
  for (let d = 1; d <= days; d++) {
    const dateStr = fmtDate(year, month, d);
    cells.push({
      y: year,
      m: month,
      d,
      dateStr,
      holidayName: holidayMap.get(dateStr),
    });
  }
  // 뒤쪽 빈칸(마지막 주 채우기)
  while (cells.length % 7 !== 0) cells.push({ y: year, m: month, d: null });

  // 헤더용 표시(요청 이미지 스타일)
  const yoil = ["일", "월", "화", "수", "목", "금", "토"][selected.getDay()];
  const headerDate = `${year}.${pad(month)}.${pad(day)}`;

  return (
    <div className="w-full max-w-[22rem] text-card-foreground overflow-hidden">
      {/* 상단 날짜 */}
      <div className="px-6 pt-5 pb-4 text-center">
        <div className="text-xl font-semibold">{headerDate}</div>
        <div className="text-sm text-foreground/70">{yoil}요일</div>
      </div>

      <div className="px-4 pb-4">
        {/* 월 타이틀 */}
        <div className="py-2 text-center text-base font-semibold">
          {year}.{pad(month)}
        </div>

        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 text-center text-xs font-medium text-foreground/60 mb-2">
          {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
            <div key={d} className="py-1">
              {d}
            </div>
          ))}
        </div>

        {/* 날짜 그리드 */}
        <div className="grid grid-cols-7 gap-y-1 text-sm">
          {cells.map((cell, i) => {
            if (!cell.d) return <div key={i} className="h-10" />;

            const dateObj = new Date(cell.y, cell.m - 1, cell.d);
            const dow = dateObj.getDay();
            const isSun = dow === 0;
            const isSat = dow === 6;
            const isSelected = cell.d === day;

            const isHoliday = !!cell.holidayName;
            const colorClass = isHoliday
              ? "text-red-500"
              : isSun
              ? "text-red-500"
              : isSat
              ? "text-blue-500"
              : "text-foreground";

            return (
              <div className="h-10 grid place-items-center" key={i}>
                <div
                  className={[
                    "relative h-9 w-9 grid place-items-center rounded-full",
                    isSelected
                      ? "bg-primary/20 text-primary ring-1 ring-primary"
                      : "",
                    colorClass,
                  ].join(" ")}
                  title={cell.holidayName || undefined}
                >
                  {cell.d}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
