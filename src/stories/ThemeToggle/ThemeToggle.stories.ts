import type { Meta, StoryObj } from '@storybook/react';
import { ThemeToggle } from './ThemeToggle';

const meta: Meta<typeof ThemeToggle> = {
  title: 'Example/ThemeToggle',
  component: ThemeToggle,
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: {
        type: 'radio',
        options: ['light', 'dark'],
      },
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof ThemeToggle>;

// Основная история компонента с темой "light"
export const LightTheme: Story = {
  args: {
    theme: 'light',
  },
};

// История компонента с темой "dark"
export const DarkTheme: Story = {
  args: {
    theme: 'dark',
  },
};
