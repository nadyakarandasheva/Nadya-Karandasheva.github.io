import React from 'react';
import { Link } from 'react-router-dom';

import './logo.css';

/**
 * Компонент логотипа.
 * @returns {JSX.Element}
 */
export const Logo = (): JSX.Element => (
  <Link to="/" className={'logo'}>
    Logo
  </Link>
);
