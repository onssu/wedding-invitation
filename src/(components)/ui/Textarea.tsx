import * as React from "react";

/**
 * Tailwind v4 전제:
 * - 전역 CSS(예: src/app/globals.css)에 `@import "tailwindcss";`
 */

export type TextareaUiSize = "sm" | "md" | "lg";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * 시각적 크기(padding/폰트/최소 높이)
   * - Input과 동일한 명명으로 맞춤
   */
  uiSize?: TextareaUiSize;
  /**
   * 유효성 오류 상태(스타일/aria 반영)
   */
  invalid?: boolean;
  /**
   * 자동 높이 증가 여부 (내용에 맞춰 height 조절)
   */
  autoGrow?: boolean;
}

const sizeClassMap: Record<TextareaUiSize, string> = {
  sm: "min-h-[84px] px-3 py-2 text-[13px]",
  md: "min-h-[104px] px-3.5 py-2.5 text-[14px]",
  lg: "min-h-[128px] px-4 py-3 text-[15px]",
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      uiSize = "md",
      invalid = false,
      autoGrow = false,
      className,
      disabled,
      readOnly,
      placeholder,
      onInput,
      ...rest
    },
    ref
  ) => {
    const innerRef = React.useRef<HTMLTextAreaElement>(null);

    // ref 포워딩
    React.useImperativeHandle(
      ref,
      () => innerRef.current as HTMLTextAreaElement
    );

    // autoGrow: 입력 시 내용에 맞춰 높이 조절
    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
      if (autoGrow && innerRef.current) {
        const el = innerRef.current;
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
      }
      onInput?.(e);
    };

    React.useEffect(() => {
      if (autoGrow && innerRef.current) {
        const el = innerRef.current;
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
      }
    }, [autoGrow, rest.defaultValue, rest.value]);

    const base = [
      "w-full",
      "rounded-md",
      "border",
      "shadow-sm",
      "outline-none",
      "transition",
      "resize-y", // 수직 리사이즈 허용
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

    const merged = [base, sizeCls, invalidCls, className]
      .filter(Boolean)
      .join(" ");

    return (
      <textarea
        ref={innerRef}
        placeholder={placeholder}
        aria-invalid={invalid || undefined}
        disabled={disabled}
        readOnly={readOnly}
        className={merged}
        onInput={handleInput}
        {...rest}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
