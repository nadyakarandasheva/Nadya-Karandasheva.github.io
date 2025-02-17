import React from 'react';

import { Logo } from '../logo/Logo';

import styles from './header.css';

/**
 * Компонент шапки страницы.
 * @returns {JSX.Element} 
 */
export const Header = (): JSX.Element => (
  <header className={styles.header}>
    <Logo />
  </header>
);
