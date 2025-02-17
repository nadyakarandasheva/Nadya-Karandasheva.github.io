import React, { FC } from 'react';

import styles from './modal.css';

/**
 * Интерфесй компонента модального окна.
 * @prop {React.ReactNode} children - Дочерние элементы.
 * @prop {() => void} onClose - Функция закрфтия модального окна.
 */
interface IModalProps {
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
    <div className={styles.modal}>
      <div className={styles.content}>
        <button className={styles.close} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};
