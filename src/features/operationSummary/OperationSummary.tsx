import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';

import { Modal } from 'shared/modal/Modal';
import { CreateOrEditOperationForm } from 'pages/OperationsPageAdmin/CreateOrEditOperationForm/CreateOrEditOperationForm';

import { operationsActions } from 'app/store/sagas/operations/operations';
import { CreateOperationFormValues } from '../forms/OperationForm/types';
import { OperationParams } from 'server.types';

import styles from './OperationSummary.module.css';

/**
 * Компонент краткого отображения операции.
 * @params {IOperationSummary} params - Входные параметры компонента.
 * @returns {JSX.Element}
 */
export const OperationSummary: FC<OperationParams> = ({
  id,
  amount,
  category,
  name,
  type,
  date,
  desc,
}): JSX.Element => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSubmit = (values: CreateOperationFormValues) => {
    dispatch(
      operationsActions.updateOperation({
        ...values,
        id: id,
        data: values,
      })
    );

    setTimeout(() => setIsModalOpen(false), 2000);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.summaryHeader}>
          <div className={styles.amount}>{amount} ₽</div>
          <Button onClick={() => setIsModalOpen(true)}> {'Редактировать'}</Button>
        </div>
        <div className={styles.details}>
          <div className={styles.category}>{category.name}</div>
          <div className={styles.title}>{name}</div>
          <div className={styles.description}>{type}</div>
        </div>
      </div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <CreateOrEditOperationForm
            initialValues={{
              amount: amount,
              categoryId: category.id,
              name: name,
              type: type,
              date: date,
              desc: desc,
            }}
            onSubmit={handleSubmit}
          />
        </Modal>
      )}
    </>
  );
};

OperationSummary.displayName = 'OperationSummary'