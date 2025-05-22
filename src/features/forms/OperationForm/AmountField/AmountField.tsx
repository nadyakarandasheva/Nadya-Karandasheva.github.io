import React, { memo } from 'react';
import { Input } from 'antd';
import { FormikHandlers } from 'formik';

import { FormItem } from 'src/shared/FormItem/FormItem';
import { getValidates } from 'src/utils/validation';

import { CreateOperationFormProps } from '../types';

export type AmountFieldProps = Pick<CreateOperationFormProps, 'className' | 'disabled' | 'autoFocusElement'> & {
  submitCount: number;
  touched: boolean;
  errors: string;
  value: number;
  onPressEnter: () => void;
  onChange: FormikHandlers['handleChange'];
  onBlur: FormikHandlers['handleBlur'];
};

export const AmountField = memo<AmountFieldProps>(
  ({ className, onChange, onBlur, onPressEnter, autoFocusElement, touched, value, errors, disabled, submitCount }) => {
    const { validateStatus, help } = getValidates(errors, touched, submitCount);

    return (
      <FormItem className={className} title="Сумма" required validateStatus={validateStatus} help={help}>
        <Input
          disabled={disabled}
          ref={autoFocusElement}
          onPressEnter={onPressEnter}
          data-cy="input"
          autoFocus
          type="number"
          name="amount"
          min={0}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder={'Укажите сумму'}
        />
      </FormItem>
    );
  }
);

AmountField.displayName = 'AmountField';
