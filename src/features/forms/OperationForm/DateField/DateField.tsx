import React, { memo } from 'react';
import { FormikHandlers } from 'formik/dist/types';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

import { FormItem } from '../../../../shared/FormItem/FormItem';

import { getValidates } from 'utils/validation';
import { CreateOperationFormProps } from '../types';

export type DateFieldProps = Pick<CreateOperationFormProps, 'disabled'> & {
  submitCount: number;
  touched: boolean;
  errors: string;
  value: string;
  onPressEnter: () => void;
  onChange: FormikHandlers['handleChange'];
  onBlur: FormikHandlers['handleBlur'];
};

/**
 * Компонент поля даты.
 */
export const DateField = memo<DateFieldProps>(({ onChange, onBlur, touched, value, errors, disabled, submitCount }) => {
  const { validateStatus, help } = getValidates(errors, touched, submitCount);

  return (
    <FormItem title={'Описание'} validateStatus={validateStatus} help={help}>
      <DatePicker
        name="date"
        disabled={disabled}
        format="YYYY-MM-DD"
        value={value ? dayjs(value) : undefined}
        onChange={(date, dateString) => {
          onChange({
            target: {
              name: 'date',
              value: dateString,
            },
          } as React.ChangeEvent<HTMLInputElement>);
        }}
        onBlur={() =>
          onBlur({
            target: {
              name: 'date',
            },
          } as React.FocusEvent<HTMLInputElement>)
        }
        placeholder="Выберите дату операции"
      />
    </FormItem>
  );
});

DateField.displayName = 'DateField';
