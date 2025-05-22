import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '../button/Button';

/**
 * Интерфейс компонента переключателя тем.
 */
export interface IToggleProps {
  theme: string;
  onClick: () => void;
}

/**
 * Компонент переключателя тем.
 * @param {IToggleProps} param - Входные параметры компонента.
 * @returns
 */
export const ThemeToggle: React.FC<IToggleProps> = ({ theme, onClick }) => {
  const { t } = useTranslation();

  const handleClick = () => {
    onClick();
  };

  return (
    <Button
      label={`${theme === 'light' ? t('switshThemeToDark') : t('switshThemeToLight')}`}
      onClick={handleClick}
      isPrimary={true}
    />
  );
};
