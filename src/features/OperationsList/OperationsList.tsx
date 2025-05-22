import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { OperationSummary } from 'features/OperationSummary/OperationSummary';
import { operationsActions, operationsSelectors } from 'app/store/sagas/operations/operations';
import { RootState } from 'app/store';

import styles from './OperationsList.module.css';

/**
 * Компонент списка операций.
 * @returns
 */
export const OperationsList = () => {
  const dispatch = useDispatch();
  const operations = useSelector(operationsSelectors.all);
  const pagination = useSelector((state: RootState) => state.operations.filter.pagination);
  const loading = useSelector((state: RootState) => state.operations.filter.loading);
  const total = useSelector((state: RootState) => state.operations.filter.pagination?.total);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const pageSize = 10;

  useEffect(() => {
    dispatch(
      operationsActions.fetchOperations({
        pagination: { pageSize, pageNumber: 1 },
        sorting: { type: 'DESC', field: 'createdAt' },
      })
    );
  }, [dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      const nextPage = (pagination?.pageNumber || 1) + 1;
      const hasMore = (pagination?.pageSize || 0) * (pagination?.pageNumber || 1) < (total || 0);

      if (entry.isIntersecting && !loading && hasMore) {
        dispatch(
          operationsActions.fetchOperations({
            pagination: { pageSize, pageNumber: nextPage },
            sorting: { type: 'DESC', field: 'createdAt' },
          })
        );
      }
    });

    const ref = observerRef.current;
    if (ref) observer.observe(ref);
    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [dispatch, pagination, loading, total]);

  return (
    <div className={styles.operationsListContainer}>
      {operations.map((operation, index) => (
        <OperationSummary key={index} {...operation} />
      ))}
      <div ref={observerRef} style={{ height: 20 }} />
    </div>
  );
};
