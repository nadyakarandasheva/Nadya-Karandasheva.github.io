import React, { memo } from 'react';
import { Select } from 'antd';
import { FormikHandlers } from 'formik/dist/types';

import { FormItem } from '../../../../shared/FormItem/FormItem';

import { getValidates } from 'utils/validation';
import { CreateOperationFormProps } from '../types';
import { Operation } from 'server.types';

export type IOperationTypeFieldProps = Pick<CreateOperationFormProps, 'disabled'> & {
  value: Operation;
  onChange: FormikHandlers['handleChange'];
  onBlur: FormikHandlers['handleBlur'];
  errors?: string;
  touched?: boolean;
  submitCount: number;
  disabled?: boolean;
};

/**
 * Компонент поля тип операции.
 */
export const OperationTypeField = memo<IOperationTypeFieldProps>(
  ({ value, onChange, onBlur, errors, touched, submitCount, disabled }) => {
    const { validateStatus, help } = getValidates(errors, touched, submitCount);

    const handleChange = (val: Operation) => {
      onChange({
        target: {
          name: 'type',
          value: val,
        },
      } as unknown as React.ChangeEvent<any>);
    };

    return (
      <FormItem title="Тип операции" required validateStatus={validateStatus} help={help}>
        <Select value={value} onChange={handleChange} onBlur={onBlur} disabled={disabled} style={{ width: '100%' }}>
          <Select.Option value={'Cost' as unknown as Operation}>Расход</Select.Option>
          <Select.Option value={'Profit' as unknown as Operation}>Доход</Select.Option>
        </Select>
      </FormItem>
    );
  }
);

OperationTypeField.displayName = 'OperationTypeField';
