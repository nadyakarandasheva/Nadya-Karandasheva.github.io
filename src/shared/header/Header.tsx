import React from 'react';
import { useTranslation } from 'react-i18next';

import { ThemeToggle } from '../themeToggle/ThemeToggle';
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
      <div className={"switchersContainer"}>
        <ThemeToggle theme={theme} onClick={toggleTheme} />
        <LanguageToggle />
      </div>
    </header>
  )
};
