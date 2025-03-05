import React, { FC } from 'react';

import { Button } from 'src/shared/button/Button';

import './operationDetail.css';

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
    <div className={'container'}>
      <div className={'amount'}>{amount} ₽</div>
      <div className={'details'}>
        <div className={'category'}>{category}</div>
        <div className={'title'}>{title}</div>
        <div className={'description'}>{description}</div>
        <div className={'date'}>{date}</div>
      </div>
      <Button label='edit' onClick={onEdit} isDisabled={isDisabled} />
    </div>
  );
};
