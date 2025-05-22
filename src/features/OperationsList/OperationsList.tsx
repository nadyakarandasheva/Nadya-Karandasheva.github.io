import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { OperationSummary } from "../operationSummary/OperationSummary";
import { operationsActions, operationsSelectors } from "src/app/store/sagas/operations/operations";

import './operationsList.css';
import { RootState } from "src/app/store";

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

  // Запрос первой страницы
  useEffect(() => {
    dispatch(operationsActions.fetchOperations({
      pagination: { pageSize, pageNumber: 1 },
      sorting: { type: 'DESC', field: 'createdAt' }
    }));
  }, [dispatch]);

  // Подгрузка при скролле
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      const nextPage = (pagination?.pageNumber || 1) + 1;
      const hasMore = (pagination?.pageSize || 0) * (pagination?.pageNumber || 1) < (total || 0);

      if (entry.isIntersecting && !loading && hasMore) {
        dispatch(operationsActions.fetchOperations({
          pagination: { pageSize, pageNumber: nextPage },
          sorting: { type: 'DESC', field: 'createdAt' }
        }));
      }
    });

    const ref = observerRef.current;
    if (ref) observer.observe(ref);
    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [dispatch, pagination, loading, total]);

  return (
    <div className="operationsListContainer">
      {operations.map((operation, index) => (
        <OperationSummary key={index} {...operation} />
      ))}
      <div ref={observerRef} style={{ height: 20 }} />
    </div>
  );
};
