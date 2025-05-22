import React, { useState, FC } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';

import { Title } from 'src/shared/Title/Title';
import { Modal } from 'src/shared/modal/Modal';
import { OperationsList } from 'src/features/OperationsList/OperationsList';
import { CreateOrEditOperationForm } from './CreateOrEditOperationForm/CreateOrEditOperationForm';
import { CreateOperationFormValues } from 'src/features/forms/OperationForm/types';
import { operationsActions } from 'src/app/store/sagas/operations/operations';
import { CreateCategoryForm, CreateCategoryFormValues } from './CreateCategoryForm/CreateCategoryForm';

import styels from './OperationsPageAdmin.module.css';

export const OperationsPageAdmin: FC = () => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState<boolean>(false);

  const handleSubmit = (values: CreateOperationFormValues) => {
    dispatch(
      operationsActions.createOperation({
        ...values,
      })
    );

    setTimeout(() => setIsModalOpen(false), 2000);
  };

  const handleCreateCategory = (values: CreateCategoryFormValues) => {
    dispatch(
      operationsActions.createCategoryRequest({
        ...values,
      })
    );

    setTimeout(() => setIsCategoryModalOpen(false), 2000);
  };

  return (
    <div className={styels.page}>
      <div className={styels.headerContainer}>
        <Title>{'Управление операциями'}</Title>
        <Button
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          {'Добавить операцию'}
        </Button>
        <Button
          onClick={() => {
            setIsCategoryModalOpen(true);
          }}
        >
          {'Создать категорию'}
        </Button>
      </div>
      <OperationsList />
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <CreateOrEditOperationForm onSubmit={handleSubmit} />
        </Modal>
      )}
      {isCategoryModalOpen && (
        <Modal onClose={() => setIsCategoryModalOpen(false)}>
          <CreateCategoryForm onSubmit={handleCreateCategory} />
        </Modal>
      )}
    </div>
  );
};
