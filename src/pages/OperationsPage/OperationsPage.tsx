import React, { useState } from "react";
import { FC } from "react";
import { Button } from "antd";

import { Title } from "src/shared/Title/Title";
import { Modal } from "src/shared/modal/Modal";
import { OperationsList } from "src/features/OperationsList/OperationsList";
import { CreateOrEditOperationForm } from "./CreateOrEditOperationForm/CreateOrEditOperationForm";

import styels from './OperationsPage.module.css';

export const OperationsPage: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className={styels.page}>
      <div className={styels.headerContainer}>
        <Title>{'Страница операций'}</Title>
        <Button onClick={() => { setIsModalOpen(true) }}>{'Добавить операцию'}</Button>
      </div>
      <OperationsList />
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)}>
        <CreateOrEditOperationForm onSubmit={(values) => console.log('Создание', values)} /></Modal>}
    </div>
  )
}