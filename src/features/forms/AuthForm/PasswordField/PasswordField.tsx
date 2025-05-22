import React, { memo } from 'react';
import Input from 'antd/lib/input';
import { FormikHandlers } from 'formik/dist/types';
import { LockOutlined } from '@ant-design/icons';

import { AuthFormProps } from 'features/forms/AuthForm';
import { FormItem } from 'shared/FormItem/FormItem';
import { getValidates } from 'utils/validation';

export type PasswordFieldProps = Pick<AuthFormProps, 'disabled'> & {
  submitCount: number;
  touched: boolean;
  errors: string;
  value: string;
  onChange: FormikHandlers['handleChange'];
  onPressEnter: () => void;
  onBlur: FormikHandlers['handleBlur'];
};

/**
 * Компонент поля ввода пароля.
 */
export const PasswordField = memo<PasswordFieldProps>(
  ({ onChange, onBlur, onPressEnter, touched, value, errors, disabled, submitCount }) => {
    const { validateStatus, help } = getValidates(errors, touched, submitCount);

    return (
      <FormItem title={'Пароль'} required validateStatus={validateStatus} help={help}>
        <Input.Password
          prefix={<LockOutlined />}
          onPressEnter={onPressEnter}
          disabled={disabled}
          data-cy="input"
          name="password"
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder={'Укажите пароль'}
        />
      </FormItem>
    );
  }
);

PasswordField.displayName = 'PasswordField';
