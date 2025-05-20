import React, { FC, useState } from 'react';
import { Button } from 'antd';

import { Modal } from 'src/shared/modal/Modal';
import { CreateOrEditOperationForm } from 'src/pages/OperationsPage/CreateOrEditOperationForm/CreateOrEditOperationForm';

import './operationSummary.css';

/**
 * Компонент краткого отображения операции.
 * @prop {number} id - Идентификатор.
 * @prop {number} amount - Сумма операции.
 * @prop {string} category - Категория.
 * @prop {string} title - Название.
 * @prop {string} description - Описание.
 */
export interface IOperationSummaryProps {
  id: number;
  amount: number;
  category: string;
  title: string;
  description: string;
  date: string;
}

/**
 * Компонент краткого отображения операции.
 * @params {IOperationSummaryProps} params - Входные параметры компонента.
 * @returns {JSX.Element}
 */
export const OperationSummary: FC<IOperationSummaryProps> = ({ id, amount, category, title, description, date }): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <div className={'container'}>
        <div className='summaryHeader'>
          <div className={'amount'}>{amount} ₽</div>
          <Button onClick={() => setIsModalOpen(true)}> {'Редактировать'}</Button>
        </div>
        <div className={'details'}>
          <div className={'category'}>{category}</div>
          <div className={'title'}>{title}</div>
          <div className={'description'}>
            {description.length > 50 ? `${description.substring(0, 50)}...` : description}
          </div>
        </div>
      </div>
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)}>
        <CreateOrEditOperationForm initialValues={{
          amount: amount,
          category: category,
          title: title,
          description: description,
          date: date,
        }}
          onSubmit={(values) => console.log('Редактирование', values)} />
      </Modal>}
    </>
  );
};