import React, { memo } from 'react';
import { Input } from 'antd';
import { FormikHandlers } from 'formik/dist/types';
import { LockOutlined } from '@ant-design/icons';
import { FormItem } from 'src/shared/FormItem/FormItem';
import { getValidates } from 'src/utils/validation';
import { ChangePasswordFormProps } from '../types';


export type PasswordFieldProps = Pick<ChangePasswordFormProps, 'className' | 'disabled' | 'autoFocusElement'> & {
  submitCount: number;
  touched: boolean;
  errors: string;
  value: string;
  onChange: FormikHandlers['handleChange'];
  onPressEnter: () => void;
  onBlur: FormikHandlers['handleBlur'];
};

/**
 * Компонент ввода пароля.
 */
export const PasswordField = memo<PasswordFieldProps>(
  ({ className, onChange, onBlur, onPressEnter, touched, value, errors, disabled, submitCount, autoFocusElement }) => {

    const { validateStatus, help } = getValidates(errors, touched, submitCount);

    return (
      <FormItem
        className={className}
        title={'Пароль'}
        required
        validateStatus={validateStatus}
        help={help}
      >
        <Input.Password
          ref={autoFocusElement}
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
