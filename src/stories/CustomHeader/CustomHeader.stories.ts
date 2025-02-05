import type { Meta } from '@storybook/react';
import { CustomHeader } from './CustomHeader';

const meta: Meta<typeof CustomHeader> = {
  title: 'Example/CustomHeader',
  component: CustomHeader,
  tags: ['autodocs'],
};

export default meta;

export const Default = {
  args: {},
};
