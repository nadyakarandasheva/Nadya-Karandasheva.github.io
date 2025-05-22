import type { Meta } from '@storybook/react';

import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Example/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    isVisible: { control: 'boolean' },
    onClose: { action: 'closed' },
  },
};

export default meta;

export const Visible = {
  args: {
    isVisible: true,
    children: 'This is a modal',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onClose: () => {},
  },
};

export const Hidden = {
  args: {
    isVisible: false,
    children: 'This is a modal',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onClose: () => {},
  },
};
