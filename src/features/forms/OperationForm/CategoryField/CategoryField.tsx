import React from 'react';
import { memo } from 'react';
import { Input } from 'antd';
import { FormikHandlers } from 'formik';

import { FormItem } from 'src/shared/FormItem/FormItem';
import { getValidates } from 'src/utils/validation';

import { CreateOperationFormProps } from '../types';

export type CategoryFieldProps = Pick<CreateOperationFormProps, 'className' | 'disabled' | 'autoFocusElement'> & {
  submitCount: number;
  touched: boolean;
  errors: string;
  value: string;
  onPressEnter: () => void;
  onChange: FormikHandlers['handleChange'];
  onBlur: FormikHandlers['handleBlur'];
};

export const CategoryField = memo<CategoryFieldProps>(
  ({ className, onChange, onBlur, onPressEnter, autoFocusElement, touched, value, errors, disabled, submitCount }) => {

    const { validateStatus, help } = getValidates(errors, touched, submitCount);

    return (
      <FormItem
        className={className}
        title="Категория"
        required
        validateStatus={validateStatus}
        help={help}
      >
        <Input
          disabled={disabled}
          ref={autoFocusElement}
          onPressEnter={onPressEnter}
          data-cy="input"
          autoFocus
          type="text"
          name="category"
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder={'Укажите категорию'}
        />
      </FormItem>
    );
  }
);
