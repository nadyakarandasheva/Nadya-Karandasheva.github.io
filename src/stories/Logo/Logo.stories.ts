import type { Meta } from '@storybook/react';
import { Logo } from './Logo';

const meta: Meta<typeof Logo> = {
  title: 'Example/Logo',
  component: Logo,
  tags: ['autodocs'],
};

export default meta;

export const Default = {
  args: {},
};
