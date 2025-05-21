import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';

import { Modal } from 'src/shared/modal/Modal';
import { CreateOrEditOperationForm } from 'src/pages/OperationsPage/CreateOrEditOperationForm/CreateOrEditOperationForm';

import { IOperationSummary } from 'src/interfaces/operation-summary.interafce';
import { operationsActions } from 'src/app/store/sagas/operations/operations';
import { CreateOperationFormValues } from '../forms/OperationForm/types';

import './operationSummary.css';

/**
 * Компонент краткого отображения операции.
 * @params {IOperationSummary} params - Входные параметры компонента.
 * @returns {JSX.Element}
 */
export const OperationSummary: FC<IOperationSummary> = ({ id, amount, category, title, description, date }): JSX.Element => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSubmit = (values: CreateOperationFormValues) => {
    dispatch(operationsActions.saveOperation({
      ...values,
      id: id
    }));

    setTimeout(() => setIsModalOpen(false), 2000);
  }

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
          onSubmit={handleSubmit} />
      </Modal>}
    </>
  );
};