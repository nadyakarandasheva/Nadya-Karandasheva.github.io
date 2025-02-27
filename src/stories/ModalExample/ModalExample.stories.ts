import type { Meta, StoryObj } from '@storybook/react';
import { ModalExample } from './ModalExample';

const meta: Meta<typeof ModalExample> = {
  title: 'Example/ModalExample',
  component: ModalExample,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ModalExample>;

export const Default: Story = {};
