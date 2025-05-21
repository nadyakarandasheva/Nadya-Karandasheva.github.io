import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { OperationSummary } from "../operationSummary/OperationSummary";
import { operationsActions, operationsSelectors } from "src/app/store/sagas/operations/operations";

import './operationsList.css';

/**
 * Компонент списка операций.
 * @returns 
 */
export const OperationsList = () => {
  const dispatch = useDispatch();
  const operations = useSelector(operationsSelectors.all);

  const observerRef = useRef(null);

  useEffect(() => {
    dispatch(operationsActions.fetchOperations());
  }, [dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        dispatch(operationsActions.fetchOperations());
      }
    });

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [dispatch]);

  return (
    <div className="operationsListContainer">
      {operations.map((operation, index) => (
        <OperationSummary key={index} {...operation} />
      ))}
      <div ref={observerRef} style={{ height: 20 }} />
    </div>
  );
};
