import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Login } from 'features/Login/Login';
import { Logo } from '../logo/Logo';

import { RootState } from 'app/store';
import { tokenSelectors } from 'app/store/token';

import styles from './Header.module.css';


/**
 * Компонент шапки страницы.
 * @returns {JSX.Element}
 */
export const Header = (): JSX.Element => {
  const token = useSelector<RootState, RootState['token']>(tokenSelectors.get);
  return (
    <header className={styles.header}>
      <Logo />
      {token && <Link to="/operations-admin">Операции (Админ)</Link>}
      <Link to="/operations">Операции</Link>
      <Link to="/profile">Профиль пользователя</Link>
      <Login />
    </header>
  );
};
