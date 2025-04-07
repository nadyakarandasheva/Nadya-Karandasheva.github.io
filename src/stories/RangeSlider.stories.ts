import type { Meta, StoryObj } from '@storybook/react';

import { RangeSlider } from '../shared/rangeSlider/RangeSlider';

const meta: Meta<typeof RangeSlider> = {
  title: 'Example/RangeSlider',
  component: RangeSlider,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    min: -100,
    max: 100,
  },
};