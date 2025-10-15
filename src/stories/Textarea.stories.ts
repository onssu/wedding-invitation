import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import Textarea, { type TextareaProps } from "@/(components)/ui/Textarea";

const meta = {
  title: "Forms/Textarea",
  tags: ["autodocs"],
  component: Textarea,
  parameters: { layout: "centered" },
  argTypes: {
    uiSize: { control: "inline-radio", options: ["sm", "md", "lg"] },
    invalid: { control: "boolean" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    placeholder: { control: "text" },
    rows: { control: "number" },
    maxLength: { control: "number" },
    autoGrow: { control: "boolean" },
    name: { control: "text" },
    id: { control: "text" },
    autoComplete: { control: "text" },
    spellCheck: { control: "boolean" },
    wrap: { control: "select", options: ["hard", "soft", "off"] },
  },
  args: {
    uiSize: "md",
    placeholder: "내용을 입력하세요…",
    rows: 4,
    autoGrow: false,
  },
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    defaultValue: "",
  } as TextareaProps,
};

export const Invalid: Story = {
  args: {
    invalid: true,
    placeholder: "에러가 있는 상태예요",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "비활성화되어 수정할 수 없습니다.",
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    defaultValue: "읽기 전용입니다.",
  },
};

export const LargeAutoGrow: Story = {
  args: {
    uiSize: "lg",
    autoGrow: true,
    defaultValue:
      "여러 줄을 입력하면 높이가 자동으로 늘어나요.\n한 줄 더 적어볼까요?\n또 한 줄!",
  },
};
