import React from 'react';

import { Button } from '../../shared/button/Button';

export interface ToggleProps {
  theme: string;
  onClick: () => void;
}

export const ThemeToggle: React.FC<ToggleProps> = ({ theme, onClick }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <Button label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} onClick={handleClick} isPrimary={true} />
  );
};
