import React, { memo } from 'react';
import Input from 'antd/lib/input';
import { FormikHandlers } from 'formik/dist/types';
import { LockOutlined } from '@ant-design/icons';
import { FormItem } from 'src/shared/FormItem/FormItem';
import { getValidates } from 'src/utils/validation';
import { ChangePasswordFormProps } from '../types';

export type NewPasswordFieldProps = Pick<ChangePasswordFormProps, 'className' | 'disabled'> & {
  submitCount: number;
  touched: boolean;
  errors: string;
  value: string;
  onChange: FormikHandlers['handleChange'];
  onPressEnter: () => void;
  onBlur: FormikHandlers['handleBlur'];
};

/**
 * Компонент поля ввода нового пароля.
 */
export const NewPasswordField = memo<NewPasswordFieldProps>(
  ({ className, onChange, onBlur, onPressEnter, touched, value, errors, disabled, submitCount }) => {

    const { validateStatus, help } = getValidates(errors, touched, submitCount);

    return (
      <FormItem
        className={className}
        title={'Новый пароль'}
        required
        validateStatus={validateStatus}
        help={help}
      >
        <Input.Password
          prefix={<LockOutlined />}
          onPressEnter={onPressEnter}
          disabled={disabled}
          data-cy="input"
          name="newPassword"
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder={'Укажите новый пароль'}
        />
      </FormItem>
    );
  }
);

