import React from 'react';
import { Link } from 'react-router-dom';

import { Login } from 'features/Login/Login';
import { Logo } from '../logo/Logo';

import styles from './Header.module.css';

/**
 * Компонент шапки страницы.
 * @returns {JSX.Element}
 */
export const Header = (): JSX.Element => {
  return (
    <header className={styles.header}>
      <Logo />
      <Link to="/operations-admin">Операции (Админ)</Link>
      <Link to="/operations">Операции</Link>
      <Link to="/profile">Профиль пользователя</Link>
      <Login />
    </header>
  );
};