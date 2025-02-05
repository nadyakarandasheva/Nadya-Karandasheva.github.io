import React, { FC } from 'react';

import './operationSummary.css';

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
 * @returns 
 */
export const OperationSummary: FC<IOperationSummaryProps> = ({ amount, category, title, description }) => {
  return (
    <div className="container">
      <div className="amount">{amount} ₽</div>
      <div className="details">
        <div className="category">{category}</div>
        <div className="title">{title}</div>
        <div className="description">
          {description.length > 50 ? `${description.substring(0, 50)}...` : description}
        </div>
      </div>
    </div>
  );
};
