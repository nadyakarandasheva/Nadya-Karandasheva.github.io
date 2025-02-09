import React, { FC } from 'react';

import styles from './operationSummary.css';

/**
 * Компонент краткого отображения операции.
 * @prop {number} amount - Сумма операции.
 * @prop {string} category - Категория.
 * @prop {string} title - Название.
 * @prop {string} description - Описание.
 */
interface IOperationSummaryProps {
  amount: number;
  category: string;
  title: string;
  description: string;
}

/**
 * Компонент краткого отображения операции.
 * @params {IOperationSummaryProps} params - Входные параметры компонента.
 * @returns {JSX.Element}
 */
export const OperationSummary: FC<IOperationSummaryProps> = ({ amount, category, title, description }): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.amount}>{amount} ₽</div>
      <div className={styles.details}>
        <div className={styles.category}>{category}</div>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>
          {description.length > 50 ? `${description.substring(0, 50)}...` : description}
        </div>
      </div>
    </div>
  );
};
