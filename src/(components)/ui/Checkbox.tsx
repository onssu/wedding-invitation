import * as React from "react";

export interface CheckboxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "children"
  > {
  /**
   * 박스 시각 크기
   */
  size?: "sm" | "md" | "lg";
  /**
   * 3-상태(부분 선택) 표시. DOM 속성이므로 ref로 설정합니다.
   */
  indeterminate?: boolean;
  /**
   * 유효성 오류 상태(스타일/aria 반영)
   */
  invalid?: boolean;
  /**
   * 체크박스 옆에 표시할 텍스트/노드
   */
  label?: React.ReactNode;
  /**
   * 라벨 위치 (기본: 오른쪽)
   */
  labelPlacement?: "left" | "right";
  /**
   * 외곽 래퍼(label) 클래스
   */
  containerClassName?: string;
  /**
   * 라벨 텍스트 클래스
   */
  labelClassName?: string;
}

const sizeMap = {
  sm: "w-4 h-4 text-[12px]",
  md: "w-5 h-5 text-[14px]",
  lg: "w-6 h-6 text-[16px]",
} as const;

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className, // input 자체에 적용
      containerClassName, // 바깥 label 래퍼 스타일
      labelClassName, // 텍스트 span 스타일
      size = "md",
      indeterminate,
      invalid,
      disabled,
      label,
      labelPlacement = "right",
      id,
      ...rest
    },
    ref
  ) => {
    const innerRef = React.useRef<HTMLInputElement>(null);
    const reactId = React.useId();
    const inputId = id ?? `chk-${reactId}`;

    // indeterminate는 속성으로만 제어 가능
    React.useEffect(() => {
      if (innerRef.current) {
        innerRef.current.indeterminate = !!indeterminate;
      }
    }, [indeterminate]);

    // ref 포워딩
    React.useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

    // input box base
    const boxBase = [
      "peer",
      "appearance-none",
      "border rounded-[4px]",
      "outline-none",
      "align-middle",
      "shrink-0",
      "transition",
      disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
      invalid ? "border-red-400" : "border-neutral-300",
      "focus-visible:ring focus-visible:ring-neutral-300",
      sizeMap[size],
    ].join(" ");

    // 상태별 색/체크 마크
    const stateCls = ["checked:bg-[#555ab9] checked:border-[#555ab9]"].join(
      " "
    );

    // 가짜 체크/혼합 표시 (after)
    const fakeMark = [
      // ✓
      "peer-checked:after:content-['']",
      "peer-checked:after:block",
      "peer-checked:after:w-2 peer-checked:after:h-2",
      "peer-checked:after:border-b-2 peer-checked:after:border-r-2",
      "peer-checked:after:border-white",
      "peer-checked:after:rotate-45",
      "peer-checked:after:relative peer-checked:after:left-[6px] peer-checked:after:top-[0px]",
      // mixed(—)
      "aria-[checked='mixed']:after:content-['']",
      "aria-[checked='mixed']:after:block",
      "aria-[checked='mixed']:after:w-3 aria-[checked='mixed']:after:h-[2px]",
      "aria-[checked='mixed']:after:bg-white",
      "aria-[checked='mixed']:after:relative aria-[checked='mixed']:after:left-[6px] aria-[checked='mixed']:after:top-[6px]",
      "aria-[checked='mixed']:bg-[#555ab9] aria-[checked='mixed']:border-[#555ab9]",
    ].join(" ");

    const inputClasses = [boxBase, stateCls, fakeMark, className].join(" ");
    const wrapper = [
      "inline-flex items-center gap-2 select-none",
      containerClassName,
    ]
      .filter(Boolean)
      .join(" ");

    const textEl =
      label != null ? <span className={labelClassName}>{label}</span> : null;

    return (
      <label htmlFor={inputId} className={wrapper}>
        {labelPlacement === "left" && textEl}
        <input
          id={inputId}
          ref={innerRef}
          type="checkbox"
          aria-checked={indeterminate ? "mixed" : undefined}
          disabled={disabled}
          className={inputClasses}
          {...rest}
        />
        {labelPlacement === "right" && textEl}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
