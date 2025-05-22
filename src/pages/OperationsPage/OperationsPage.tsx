import React from "react";
import { FC } from "react";
import { useSelector } from "react-redux";
import { operationsSelectors } from "src/app/store/sagas/operations/operations";
import { OperationDetail } from "src/features/OperationDetail/OperationDetail";

import styles from './OperationsPage.module.css'

export const OperationsPage: FC = () => {
  const operations = useSelector(operationsSelectors.all);

  return <div className={styles.operationsListContainer}>
    {operations.map((operation, index) => (
      <OperationDetail key={index} {...operation} />
    ))}
  </div>
}