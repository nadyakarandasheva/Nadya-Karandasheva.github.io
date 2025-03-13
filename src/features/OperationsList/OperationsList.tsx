import React, { useEffect, useRef, useState } from "react";

import { OperationSummary } from "../operationSummary/OperationSummary";

import { generateRandomOperationArray } from "src/utils/generate-random-operation-array";

import './operationsList.css';

/**
 * Компонент списка операций.
 * @returns 
 */
export const OperationsList = () => {
  const [operations, setOperations] = useState(generateRandomOperationArray(10));

  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {

        const data = generateRandomOperationArray(10);

        setOperations((prev) => [...prev, ...data]);
      }
    });

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="operationsListContainer">
      {operations.map((operation, index) => (
        <OperationSummary key={index} {...operation} />
      ))}
      <div ref={observerRef} style={{ height: 20 }} />
    </div>
  );
};
