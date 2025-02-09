import React, { FC } from 'react';

import styles from './operationDetail.css';
import { Button } from 'src/shared/button/Button';

/**
 * Компонент краткого отображения операции.
 * @prop {number} amount - Сумма операции.
 * @prop {string} category - Категория.
 * @prop {string} title - Название.
 * @prop {string} description - Описание.
 * @prop {string} date - Дата.
 * @prop {boolean | undefined} isDisabled - Неактвна ли кнопка?
 * @prop {() => void | undefined} onEdit - Функция редактирования.
 */
interface IOperationDetailProps {
  amount: number;
  category: string;
  title: string;
  description: string;
  date: string;
  isDisabled?: boolean;
  onEdit?: () => void;
}

/**
 * Компонент полного отображения операции.
 * @params {IOperationDetailProps} params - Входные параметры компонента.
 * @returns {JSX.Element}
 */
export const OperationDetail: FC<IOperationDetailProps> = ({ amount, category, title, description, date, onEdit, isDisabled = true }): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.amount}>{amount} ₽</div>
      <div className={styles.details}>
        <div className={styles.category}>{category}</div>
        <div className={styles.title}>{title}</div>
        <div className={description}>{description}</div>
        <div className={styles.date}>{date}</div>
      </div>
      <Button label='edit' onClick={onEdit} isDisabled={isDisabled} />
    </div>
  );
};
