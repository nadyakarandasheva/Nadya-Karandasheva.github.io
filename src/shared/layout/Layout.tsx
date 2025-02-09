import React from 'react';
import { FC, ReactNode } from 'react';

import { Header } from '../header/Header';

import styles from './layout.css';

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
 * @returns {JSX.Element} 
 */
export const Layout: FC<LayoutProps> = ({ children }): JSX.Element => (
  <div className={styles.container}>
    <Header />
    <main>{children}</main>
  </div>
);
