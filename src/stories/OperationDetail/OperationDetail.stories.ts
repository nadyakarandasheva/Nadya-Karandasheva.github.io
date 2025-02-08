import type { Meta, StoryObj } from '@storybook/react';
import { OperationDetail } from './OperationDetail';

const meta: Meta<typeof OperationDetail> = {
  title: 'Example/OperationDetail',
  component: OperationDetail,
  tags: ['autodocs'],
  argTypes: {
    amount: { control: 'number' },
    category: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
    date: { control: 'text' },
    isDisabled: { control: 'boolean' },
    onEdit: { action: 'edited' },
  },
};

export default meta;

type Story = StoryObj<typeof OperationDetail>;

export const Default: Story = {
  args: {
    amount: 2000,
    category: 'Category 1',
    title: 'Title 1',
    description: 'Some description for category 1.',
    date: '2024-02-05',
    isDisabled: true
  },
};

export const WithEdit: Story = {
  args: {
    amount: 750,
    category: 'Category 2',
    title: 'Title 2',
    description: 'Some description for category 2.',
    date: '2024-02-04',
    isDisabled: false,
    onEdit: () => alert('Edit clicked'),
  },
};
