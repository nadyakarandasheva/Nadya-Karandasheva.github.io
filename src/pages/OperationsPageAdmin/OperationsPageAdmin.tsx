import React, { useState, FC } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';

import { Title } from 'shared/Title/Title';
import { Modal } from 'shared/modal/Modal';
import { OperationsList } from 'features/OperationsList/OperationsList';
import { CategoriesList } from 'features/CategoriesList/CategoriesList';
import { CreateOrEditOperationForm } from './CreateOrEditOperationForm/CreateOrEditOperationForm';
import { CreateOperationFormValues } from 'features/forms/OperationForm/types';
import { operationsActions } from 'app/store/sagas/operations/operations';
import { CreateOrEditCategoryForm, CreateOrEditCategoryFormValues } from './CreateOrEditCategoryForm/CreateOrEditCategoryForm';

import styels from './OperationsPageAdmin.module.css';

/**
 * Компонент админки операций.
 * @returns 
 */
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

  const handleCreateCategory = (values: CreateOrEditCategoryFormValues) => {
    dispatch(
      operationsActions.createCategory({
        ...values,
      })
    );

    setTimeout(() => setIsCategoryModalOpen(false), 2000);
  };

  return (
    <div className={styels.page}>
      <div className={styels.headerContainer}>
        <Title>{'Управление операциями и категориями'}</Title>
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
      <div className={styels.lists}>
        <OperationsList />
        <CategoriesList />
      </div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <CreateOrEditOperationForm onSubmit={handleSubmit} />
        </Modal>
      )}
      {isCategoryModalOpen && (
        <Modal onClose={() => setIsCategoryModalOpen(false)}>
          <CreateOrEditCategoryForm onSubmit={handleCreateCategory} />
        </Modal>
      )}
    </div>
  );
};
