import React, { FC } from 'react';
import cn from 'clsx';

import { sum } from './sum';

import './button.css';

/**
 * Интерфейс компонента кнопки.
 * @prop {string} label - Лейбел.
 * @prop {boolean | undefined} isPrimary - Основная ли кнопка?
 * @prop {string | null | undefined} backgroundColor - Цвет фона.
 * @prop {string | undefined} size - Размер.
 * @prop {boolean | undefined} isDisabled - Задизейблена ли кнопка?
 * @prop {() => void | undefined} onEdit - Функция нажатия на кнопку.
 */
interface IButtonProps {
  label: string;
  isPrimary?: boolean;
  backgroundColor?: string | null;
  size?: string;
  isDisabled?: boolean;
  onClick?: () => void;
}

/**
 * Компонент кнопки.
 * @prop {IButtonProps} param - Входные параметры компонента.
 * @returns {JSX.Element}
 */
export const Button: FC<IButtonProps> = ({
  label,
  isPrimary,
  backgroundColor,
  size,
  isDisabled = false,
  onClick,
  ...props
}): JSX.Element => {
  const mode = isPrimary ? 'storybook-button--primary' : 'storybook-button--secondary';

  /**
   * Обрабатывает событие нажатия на кнопку.
   * @returns {void}
   */
  const handleClick = (): void => {
    onClick();
  };

  return (
    <button
      type="button"
      className={cn('storybook-button', `storybook-button--${size}`, mode)}
      style={{ backgroundColor: backgroundColor || 'green' }}
      onClick={handleClick}
      disabled={isDisabled}
      {...props}
    >
      {label}
    </button>
  );
};
