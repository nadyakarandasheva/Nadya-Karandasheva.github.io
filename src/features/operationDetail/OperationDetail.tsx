import React, { FC } from 'react';

import { OperationParams } from 'src/server.types';

import './operationDetail.css';

/**
 * Компонент полного отображения операции.
 * @params {OperationParams} params - Входные параметры компонента.
 * @returns {JSX.Element}
 */
export const OperationDetail: FC<OperationParams> = ({ amount, category, name, desc, date }): JSX.Element => {
  const formattedDate = new Date(date).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className={'container'}>
      <div className={'amount'}>{amount} ₽</div>
      <div className={'details'}>
        <div className={'category'}>{category.name}</div>
        <div className={'title'}>{name}</div>
        <div className={'description'}>{desc}</div>
        <div className={'date'}>{formattedDate}</div>
      </div>
    </div>
  );
};
