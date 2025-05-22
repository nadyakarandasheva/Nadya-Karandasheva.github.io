import React from 'react';

import { Logo } from '../Logo/Logo';

import './CustomHeader.css';

/**
 * Компонент шапки страницы.
 * @returns
 */
export const CustomHeader = () => (
  <header className="header">
    <Logo />
  </header>
);
