import React, { FC } from 'react';

import { useSelector } from 'react-redux';
import { operationsSelectors } from './../../app/store/sagas/operations/operations';
import { OperationDetail } from 'features/OperationDetail/OperationDetail';

import styles from './OperationsPage.module.css';

/**
 * Компонент страницы операций.
 */
export const OperationsPage: FC = () => {
  const operations = useSelector(operationsSelectors.all);

  return (
    <div className={styles.operationsListContainer}>
      {operations.map((operation, index) => (
        <OperationDetail key={index} {...operation} />
      ))}
    </div>
  );
};
