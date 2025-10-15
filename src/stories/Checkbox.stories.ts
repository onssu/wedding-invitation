import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import Checkbox from "@/(components)/ui/Checkbox";

const meta = {
  title: "Forms/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    indeterminate: { control: "boolean" },
    checked: { control: "boolean" },
    defaultChecked: { control: "boolean" },
    label: { control: "text" },
    labelPlacement: { control: "inline-radio", options: ["left", "right"] },
    name: { control: "text" },
    value: { control: "text" },
  },
  args: {
    size: "md",
    label: "동의합니다",
    labelPlacement: "right",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = { args: {} };

export const LeftLabel: Story = {
  args: { labelPlacement: "left", label: "왼쪽 라벨" },
};

export const Indeterminate: Story = {
  args: { indeterminate: true, label: "일부 선택" },
};

export const Disabled: Story = {
  args: { disabled: true, defaultChecked: true, label: "비활성화" },
};

export const Invalid: Story = {
  args: { invalid: true, label: "오류 상태" },
};
