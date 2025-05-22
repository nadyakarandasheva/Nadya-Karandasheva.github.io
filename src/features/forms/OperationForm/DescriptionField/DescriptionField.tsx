import React, { memo } from 'react';
import Input from 'antd/lib/input';
import { FormikHandlers } from 'formik/dist/types';

import { FormItem } from '../../../../shared/FormItem/FormItem';

import { getValidates } from 'utils/validation';
import { CreateOperationFormProps } from '../types';

export type DescriptionFieldProps = Pick<CreateOperationFormProps, 'disabled'> & {
  submitCount: number;
  touched: boolean;
  errors: string;
  value: string;
  onChange: FormikHandlers['handleChange'];
  onBlur: FormikHandlers['handleBlur'];
};

/**
 * Компонент поля описания.
 */
export const DescriptionField = memo<DescriptionFieldProps>(
  ({ onChange, onBlur, touched, value, errors, disabled, submitCount }) => {
    const { validateStatus, help } = getValidates(errors, touched, submitCount);

    return (
      <FormItem title={'Описание'} validateStatus={validateStatus} help={help}>
        <Input.TextArea
          disabled={disabled}
          name="desc"
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder={'Добавьте описание операции'}
        />
      </FormItem>
    );
  }
);

DescriptionField.displayName = 'DescriptionField';
