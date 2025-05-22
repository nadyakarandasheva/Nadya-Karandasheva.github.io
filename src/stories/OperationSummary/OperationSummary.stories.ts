import type { Meta, StoryObj } from '@storybook/react';
import { OperationSummary } from './OperationSummary';

const meta: Meta<typeof OperationSummary> = {
  title: 'Example/OperationSummary',
  component: OperationSummary,
  tags: ['autodocs'],
  argTypes: {
    amount: { control: 'number' },
    category: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof OperationSummary>;

export const Default: Story = {
  args: {
    amount: 1500,
    category: 'Category 1',
    title: 'Category title 1',
    description: 'Some description.',
  },
};

export const LargeAmount: Story = {
  args: {
    amount: 50000,
    category: 'Category 2',
    title: 'Category title 2',
    description: 'Some description about category 2.',
  },
};

export const LongDescription: Story = {
  args: {
    amount: 300,
    category: 'Category 3',
    title: 'Category title 3',
    description: 'Some very long and so interesting description about category 3.',
  },
};
