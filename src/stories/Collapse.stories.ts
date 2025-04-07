import type { Meta, StoryObj } from '@storybook/react';

import { Collapse } from '../shared/Collapse/Collapse';


const meta: Meta<typeof Collapse> = {
  title: 'Example/Collapse',
  component: Collapse,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    opened: true,
    children: `Это компонент Collapse. Он принимает только opened и children. Когда opened: true, дочерние компоненты
     сначала монтируются, а потом плавно появляются. В обратном случае наоборот, после скрытия дочерних компонентов,
      они размонтируются.`,
  },
};