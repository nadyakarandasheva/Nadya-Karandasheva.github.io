import React, { memo } from 'react';
import { Input } from 'antd';
import { FormikHandlers } from 'formik/dist/types';
import { UserOutlined } from '@ant-design/icons';

import { AuthFormProps } from 'features/forms/AuthForm';
import { FormItem } from 'shared/FormItem/FormItem';
import { getValidates } from 'utils/validation';

export type EmailFieldProps = Pick<AuthFormProps, 'disabled' | 'autoFocusElement'> & {
  submitCount: number;
  touched: boolean;
  errors: string;
  value: string;
  onPressEnter: () => void;
  onChange: FormikHandlers['handleChange'];
  onBlur: FormikHandlers['handleBlur'];
};

/**
 * Компонент поля ввода почты.
 */
export const EmailField = memo<EmailFieldProps>(
  ({ onChange, onBlur, onPressEnter, autoFocusElement, touched, value, errors, disabled, submitCount }) => {
    const { validateStatus, help } = getValidates(errors, touched, submitCount);

    return (
      <FormItem title={'Email'} required validateStatus={validateStatus} help={help}>
        <Input
          prefix={<UserOutlined />}
          disabled={disabled}
          ref={autoFocusElement}
          onPressEnter={onPressEnter}
          data-cy="input"
          autoFocus
          type="email"
          name="email"
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder={'Укажите email'}
        />
      </FormItem>
    );
  }
);

EmailField.displayName = 'EmailField';
