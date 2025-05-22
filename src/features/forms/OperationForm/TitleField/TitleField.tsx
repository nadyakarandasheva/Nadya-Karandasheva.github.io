import React, { memo } from 'react';
import { Input } from 'antd';
import { FormikHandlers } from 'formik';

import { FormItem } from 'shared/FormItem/FormItem';
import { getValidates } from 'utils/validation';

import { CreateOperationFormProps } from '../types';

export type TitleFieldProps = Pick<CreateOperationFormProps, 'disabled' | 'autoFocusElement'> & {
  submitCount: number;
  touched: boolean;
  errors: string;
  value: string;
  onPressEnter: () => void;
  onChange: FormikHandlers['handleChange'];
  onBlur: FormikHandlers['handleBlur'];
};

export const TitleField = memo<TitleFieldProps>(
  ({ onChange, onBlur, onPressEnter, autoFocusElement, touched, value, errors, disabled, submitCount }) => {
    const { validateStatus, help } = getValidates(errors, touched, submitCount);

    return (
      <FormItem title="Название" required validateStatus={validateStatus} help={help}>
        <Input
          disabled={disabled}
          ref={autoFocusElement}
          onPressEnter={onPressEnter}
          data-cy="input"
          autoFocus
          type="text"
          name="name"
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder={'Укажите название'}
        />
      </FormItem>
    );
  }
);

TitleField.displayName = 'TitleField';
