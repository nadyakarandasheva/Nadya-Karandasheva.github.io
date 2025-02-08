import React from 'react';

import { Logo } from '../logo/Logo';

import styles from './header.css';

/**
 * Компонент шапки страницы.
 * @returns 
 */
export const Header = () => (
  <header className={styles.header}>
    <Logo />
  </header>
);
