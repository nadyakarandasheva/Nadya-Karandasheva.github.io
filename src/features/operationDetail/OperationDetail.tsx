import React, { FC } from 'react';

import { OperationParams } from './../../server.types';

import styles from './OperationDetail.module.css';

/**
 * Компонент полного отображения операции.
 * @params {OperationParams} params - Входные параметры компонента.
 * @returns {JSX.Element}
 */
export const OperationDetail: FC<OperationParams> = ({ amount, category, name, desc, date }): JSX.Element => {
  const formattedDate = new Date(date).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className={styles.container}>
      <div className={styles.amount}>{amount} ₽</div>
      <div className={styles.details}>
        <div className={styles.category}>{category.name}</div>
        <div className={styles.title}>{name}</div>
        <div className={styles.description}>{desc}</div>
        <div className={styles.date}>{formattedDate}</div>
      </div>
    </div>
  );
};
