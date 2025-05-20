import React from 'react';
import { Link } from 'react-router-dom';

import { ThemeToggle } from '../themeToggle/ThemeToggle';
import { Login } from 'src/features/Login/Login';
import { Logo } from '../logo/Logo';

import { useTheme } from 'src/context/ThemeProvider';
import { LanguageToggle } from '../LanguageToggle/LanguageToggle';

import './header.css';

/**
 * Компонент шапки страницы.
 * @returns {JSX.Element} 
 */
export const Header = (): JSX.Element => {

  const { theme, toggleTheme } = useTheme();

  return (
    <header className={"header"}>
      <Logo />
      <Link to="/profile">Профиль пользователя</Link>
      <Link to="/operations">Операции</Link>
      <div className={"switchersContainer"}>
        <ThemeToggle theme={theme} onClick={toggleTheme} />
        <LanguageToggle />
        <Login />
      </div>
    </header>
  )
};
