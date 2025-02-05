import React, { FC } from 'react';

import styles from './modal.css';

/**
 * Интерфесй компонента модального окна.
 * @prop {boolean} isVisible - Видно ли модальное окно.
 * @prop {React.ReactNode} children - Дочерние элементы.
 * @prop {() => void} onClose - Функция закрфтия модального окна.
 */
interface IModalProps {
  isVisible: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

/**
 * Компонент модального окна.
 * @param {IModalProps} param - Входные параметры компонента. 
 * @returns 
 */
export const Modal: FC<IModalProps> = ({ isVisible, children, onClose }) => {
  if (!isVisible) return null;

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
