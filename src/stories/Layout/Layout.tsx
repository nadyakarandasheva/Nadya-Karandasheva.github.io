import React, { FC, ReactNode } from 'react';

import { CustomHeader } from '../CustomHeader/CustomHeader';

import './layout.css';

/**
 * Интерфесй компонента разметки страницы.
 * @prop {ReactNode} children - Дочерние элементы.
 */
interface LayoutProps {
  children: ReactNode;
}

/**
 * Компонент разметки страницы.
 * @params {LayoutProps} params - Входные параметры компонента.
 * @returns
 */
export const Layout: FC<LayoutProps> = ({ children }) => (
  <div className="container">
    <CustomHeader />
    <main>{children}</main>
  </div>
);
