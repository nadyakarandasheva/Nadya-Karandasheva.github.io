import React, { memo } from 'react';
import { PasswordField } from './PasswordField';
import { EmailField } from './EmailField';
import { AuthFormProps } from './types';

/**
 * Компонент формы авторизации.
 */
export const AuthForm = memo<AuthFormProps>(
  ({ formManager, formElement, autoFocusElement, disabled }: AuthFormProps) => {
    const { values, touched, errors, submitCount, handleBlur, handleSubmit, handleChange, submitForm } = formManager;

    return (
      <form ref={formElement} onSubmit={handleSubmit}>
        <EmailField
          onPressEnter={submitForm}
          autoFocusElement={autoFocusElement}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
          errors={errors.email}
          submitCount={submitCount}
          touched={touched.email}
          disabled={disabled}
        />
        <PasswordField
          onPressEnter={submitForm}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          errors={errors.password}
          submitCount={submitCount}
          touched={touched.password}
          disabled={disabled}
        />
      </form>
    );
  }
);

AuthForm.displayName = 'AuthForm';
