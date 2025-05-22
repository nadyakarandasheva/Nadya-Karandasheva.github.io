import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Tip } from '../shared/tip/Tip';

const meta: Meta<typeof Tip> = {
  title: 'Example/Tip',
  component: Tip,
};

export default meta;
type Story = StoryObj<typeof Tip>;

export const Default: Story = {
  args: {
    title: 'Example title',
    children: <div>Hover me </div>,
  },
};
