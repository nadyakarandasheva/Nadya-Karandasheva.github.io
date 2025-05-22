import React, { FC } from 'react';
import { Header } from 'shared/Header/Header';

import style from './Layout.module.css';

export type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children }) => (
  <div className={style.root}>
    <Header />
    {children}
  </div>
);
