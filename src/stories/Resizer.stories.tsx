import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Resizer } from '../shared/resizer/Resizer';

const meta: Meta<typeof Resizer> = {
  title: 'Example/Resizer',
  component: Resizer,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialHeight: 100,
    initialWidth: 200,
    children: () => <div>This is resizer content</div>,
  },
};
