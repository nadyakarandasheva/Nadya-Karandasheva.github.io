import React from 'react';
import styles from './modal.module.sass';

interface IModalProps {
  isVisible: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

/**
 * Primary UI component for user interaction
 */
export function Modal({ isVisible = false, children, onClose }: IModalProps) {
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
}
