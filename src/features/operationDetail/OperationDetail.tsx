import React, { FC } from 'react';

import { Button } from 'src/shared/button/Button';

import { IOperationDetail } from 'src/interfaces/operation-detail.interface';

import './operationDetail.css';

/**
 * Компонент полного отображения операции.
 * @params {IOperationDetail} params - Входные параметры компонента.
 * @returns {JSX.Element}
 */
export const OperationDetail: FC<IOperationDetail> = ({ amount, category, title, description, date, onEdit, isDisabled = true }): JSX.Element => {
  return (
    <div className={'container'}>
      <div className={'amount'}>{amount} ₽</div>
      <div className={'details'}>
        <div className={'category'}>{category}</div>
        <div className={'title'}>{title}</div>
        <div className={'description'}>{description}</div>
        <div className={'date'}>{date}</div>
      </div>
      <Button label='edit' onClick={onEdit} isDisabled={isDisabled} />
    </div>
  );
};
