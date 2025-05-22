import type { Meta, StoryObj } from '@storybook/react';
import { LanguageToggle } from './LanguageToggle';

import '../../i18n';

const meta: Meta<typeof LanguageToggle> = {
  title: 'Example/LanguageToggle',
  component: LanguageToggle,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof LanguageToggle>;

export const Default: Story = {};
