import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input, type InputProps } from "@/(components)/ui/Input";

/**
 * Storybook 메타:
 * - title: 탐색 패널의 계층명
 * - component: 대상 컴포넌트
 * - argTypes: 컨트롤(Controls) 설정
 */
const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
    },
    type: {
      control: "select",
      options: [
        "text",
        "password",
        "email",
        "number",
        "tel",
        "url",
        "search",
        "date",
        "datetime-local",
        "time",
        "month",
        "week",
        "color",
        "file",
      ],
    },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    invalid: { control: "boolean" },
    placeholder: { control: "text" },
    multiple: { control: "boolean" }, // file/text 등 일부 타입에서 의미 있음
    min: { control: "text" },
    max: { control: "text" },
    step: { control: "text" },
    pattern: { control: "text" },
    accept: { control: "text" }, // file 전용(MIME/확장자)
    maxLength: { control: "number" },
    minLength: { control: "number" },
    required: { control: "boolean" },
    name: { control: "text" },
    id: { control: "text" },
    autoComplete: { control: "text" },
  },
  args: {
    size: "md",
    type: "text",
    placeholder: "입력하세요…",
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * 기본 텍스트 입력 예시
 */
export const Text: Story = {
  args: {
    label: undefined,
  } as InputProps,
};

/**
 * 비활성화 상태
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "비활성화됨",
  },
};

/**
 * 오류 상태 (aria-invalid=true, 빨간 테두리)
 */
export const Invalid: Story = {
  args: {
    invalid: true,
    placeholder: "형식이 올바르지 않습니다",
  },
};

/**
 * 비밀번호 타입
 */
export const Password: Story = {
  args: {
    type: "password",
    placeholder: "비밀번호",
    autoComplete: "current-password",
  },
};

/**
 * 숫자 입력: min/max/step 사용 예시
 */
export const NumberWithConstraints: Story = {
  args: {
    type: "number",
    placeholder: "나이",
    min: 0,
    max: 120,
    step: 1,
  },
};

/**
 * 이메일 형식 + pattern 예시
 */
export const EmailPattern: Story = {
  args: {
    type: "email",
    placeholder: "name@example.com",
    // 간단 예시 (기본 브라우저 검증 + pattern 병행 가능)
    pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
    required: true,
  },
};

/**
 * 파일 업로드: accept/multiple 사용 예시
 * - Tailwind v4의 file:* 유틸로 버튼 영역 스타일 보조
 */
export const FileUpload: Story = {
  args: {
    type: "file",
    accept: "image/*",
    multiple: true,
  },
};

/**
 * 색상 선택
 */
export const Color: Story = {
  args: {
    type: "color",
    defaultValue: "#555ab9",
  },
};

/**
 * 날짜/시간 입력
 */
export const DateTime: Story = {
  args: {
    type: "datetime-local",
  },
};

/**
 * 큰 사이즈 + 프롬프트
 */
export const LargeWithPlaceholder: Story = {
  args: {
    size: "lg",
    placeholder: "큰 인풋 사이즈",
  },
};

/**
 * 읽기 전용
 */
export const ReadOnly: Story = {
  args: {
    readOnly: true,
    defaultValue: "수정 불가",
  },
};
