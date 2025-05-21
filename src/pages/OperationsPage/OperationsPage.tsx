import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FC } from "react";
import { Button } from "antd";

import { Title } from "src/shared/Title/Title";
import { Modal } from "src/shared/modal/Modal";
import { OperationsList } from "src/features/OperationsList/OperationsList";
import { CreateOrEditOperationForm } from "./CreateOrEditOperationForm/CreateOrEditOperationForm";
import { CreateOperationFormValues } from "src/features/forms/OperationForm/types";
import { operationsActions } from "src/app/store/sagas/operations/operations";
import { profileSelectors } from "src/app/store/profile";

import styels from './OperationsPage.module.css';

export const OperationsPage: FC = () => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const isAdmin = useSelector(profileSelectors.isAdmin);

  const handleSubmit = (values: CreateOperationFormValues) => {
    dispatch(operationsActions.saveOperation({
      ...values,
      id: Math.floor(Math.random() * 100000)
    }));

    setTimeout(() => setIsModalOpen(false), 2000);
  }

  return (
    <div className={styels.page}>
      <div className={styels.headerContainer}>
        <Title>{'Страница операций'}</Title>
        {isAdmin && <Button onClick={() => { setIsModalOpen(true) }}>{'Добавить операцию'}</Button>}
      </div>
      <OperationsList />
      {isModalOpen && isAdmin && <Modal onClose={() => setIsModalOpen(false)}>
        <CreateOrEditOperationForm onSubmit={handleSubmit} /></Modal>}
    </div>
  )
}