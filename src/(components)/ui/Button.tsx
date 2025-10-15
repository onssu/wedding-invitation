export interface ButtonProps {
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: "small" | "medium" | "large";
  /** Button contents */
  label: string;
  type?: "button" | "submit" | "reset";
  /** Optional click handler */
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Button = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  type,
  ...props
}: ButtonProps) => {
  const base =
    "inline-block cursor-pointer border-0 rounded-full font-bold leading-[1] font-sans";

  const sizeClass =
    size === "small"
      ? "py-[10px] px-[16px] text-[12px]"
      : size === "large"
      ? "py-[12px] px-[24px] text-[16px]"
      : "py-[11px] px-[20px] text-[14px]";

  const modeClass = primary
    ? "bg-[#555ab9] text-white"
    : [
        "bg-transparent text-[#333]",
        // inset 1px shadow 대체 (원본: rgba(0,0,0,.15) 0 0 0 1px inset)
        "shadow-[inset_0_0_0_1px_rgba(0,0,0,0.15)]",
      ].join(" ");

  return (
    <button
      type={type ? type : "button"}
      className={[base, sizeClass, modeClass].join(" ")}
      style={backgroundColor ? { backgroundColor } : undefined}
      {...props}
    >
      {label}
    </button>
  );
};
