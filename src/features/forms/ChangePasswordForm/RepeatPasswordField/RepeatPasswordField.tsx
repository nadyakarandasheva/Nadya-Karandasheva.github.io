import React, { memo } from 'react';
import Input from 'antd/lib/input';
import { FormikHandlers } from 'formik/dist/types';
import { LockOutlined } from '@ant-design/icons';

import { FormItem } from 'shared/FormItem/FormItem';
import { getValidates } from 'utils/validation';
import { ChangePasswordFormProps } from '../types';

export type PasswordFieldProps = Pick<ChangePasswordFormProps, 'className' | 'disabled'> & {
  submitCount: number;
  touched: boolean;
  errors: string;
  value: string;
  onChange: FormikHandlers['handleChange'];
  onPressEnter: () => void;
  onBlur: FormikHandlers['handleBlur'];
};

/**
 * Копмонент поля повторного ввода пароля.
 */
export const RepeatPasswordField = memo<PasswordFieldProps>(
  ({ className, onChange, onBlur, onPressEnter, touched, value, errors, disabled, submitCount }) => {
    const { validateStatus, help } = getValidates(errors, touched, submitCount);

    return (
      <FormItem className={className} title={'Повторите пароль'} required validateStatus={validateStatus} help={help}>
        <Input.Password
          prefix={<LockOutlined />}
          onPressEnter={onPressEnter}
          disabled={disabled}
          data-cy="input"
          name="repeatPassword"
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder={'Повторите пароль'}
        />
      </FormItem>
    );
  }
);

RepeatPasswordField.displayName = 'RepeatPasswordField';
