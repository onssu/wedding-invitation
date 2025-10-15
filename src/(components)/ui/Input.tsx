import * as React from "react";

/**
 * Tailwind v4 전제:
 * - 전역 CSS(예: src/app/globals.css)에 `@import "tailwindcss";`
 */

export type InputUiSize = "sm" | "md" | "lg";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * 시각적 크기 (padding/폰트 크기)
   * - 네이티브 input의 size(number)와 충돌을 피하기 위해 uiSize로 분리
   */
  uiSize?: InputUiSize;
  /**
   * 유효성 오류 상태 (aria-invalid와 스타일에 반영)
   */
  invalid?: boolean;
}

const sizeClassMap: Record<InputUiSize, string> = {
  sm: "h-9 px-3 text-[13px]",
  md: "h-10 px-3.5 text-[14px]",
  lg: "h-11 px-4 text-[15px]",
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      uiSize = "md",
      invalid = false,
      className,
      disabled,
      readOnly,
      placeholder,
      ...rest
    },
    ref
  ) => {
    const base = [
      "w-full",
      "rounded-md",
      "border",
      "shadow-sm",
      "outline-none",
      "transition",
      "placeholder:text-neutral-400",
      "text-neutral-900",
      "bg-white",
      "border-neutral-300",
      "focus-visible:ring",
      "focus-visible:ring-neutral-300",
      "focus-visible:border-neutral-400",
      disabled ? "opacity-50 cursor-not-allowed" : "cursor-text",
      readOnly ? "bg-neutral-50" : "",
    ]
      .filter(Boolean)
      .join(" ");

    const sizeCls = sizeClassMap[uiSize];

    const invalidCls = invalid
      ? "border-red-400 focus-visible:ring-red-200 focus-visible:border-red-400"
      : "";

    const fileCls =
      type === "file"
        ? [
            "file:mr-3",
            "file:rounded-md",
            "file:border-0",
            "file:bg-neutral-100",
            "file:px-3",
            "file:py-2",
            "file:text-[13px]",
            "file:font-medium",
            "hover:file:bg-neutral-200",
            "truncate",
          ].join(" ")
        : "";

    const merged = [base, sizeCls, invalidCls, fileCls, className]
      .filter(Boolean)
      .join(" ");

    return (
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        aria-invalid={invalid || undefined}
        disabled={disabled}
        readOnly={readOnly}
        className={merged}
        {...rest} // 네이티브 size(number) 포함 모든 기본 속성 그대로 전달
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
