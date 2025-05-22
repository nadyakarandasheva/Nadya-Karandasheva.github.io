import React, { FC } from 'react';

import './modal.css';

/**
 * Интерфесй компонента модального окна.
 * @prop {React.ReactNode} children - Дочерние элементы.
 * @prop {() => void} onClose - Функция закрфтия модального окна.
 */
export interface IModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

/**
 * Компонент модального окна.
 * @param {IModalProps} param - Входные параметры компонента.
 * @returns {JSX.Element}
 */
export const Modal: FC<IModalProps> = ({ children, onClose }): JSX.Element => {
  return (
    <div className={'modal'}>
      <div className={'content'}>
        <button className={'close'} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};
