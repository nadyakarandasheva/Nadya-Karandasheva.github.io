import React, { memo, useMemo } from 'react';
import { FormikConfig, useFormik } from 'formik';
import { useMutation } from '@apollo/client';
import { Button } from 'antd';

import { ChangePasswordFormErrors, ChangePasswordFormValues } from 'src/features/forms/ChangePasswordForm/types';
import { ChangePasswordForm } from 'src/features/forms/ChangePasswordForm';
import { Title } from 'src/shared/Title/Title';

import { isNotDefinedString } from 'src/utils/validation';
import { CHANGE_PASSWORD, ChangePasswordResponse, ChangePasswordVars } from './connection';

import styles from './ChangePasswordCompletedForm.module.css';

const initialValues: ChangePasswordFormValues = {
  password: undefined,
  newPassword: undefined,
  repeatPassword: undefined,
};

/**
 * Компонент формы изменения пароля.
 */
export const ChangePasswordCompletedForm = memo(() => {
  const [update, { loading }] = useMutation<ChangePasswordResponse, ChangePasswordVars>(CHANGE_PASSWORD);

  const { onSubmit, validate } = useMemo<Pick<FormikConfig<ChangePasswordFormValues>, 'onSubmit' | 'validate'>>(() => {
    return {
      onSubmit: (values) => {
        console.log('Изменение пароля', values);
      },
      validate: (values) => {
        const errors = {} as ChangePasswordFormErrors;
        if (isNotDefinedString(values.password)) {
          errors.password = 'Обязательное поле';
        }
        if (isNotDefinedString(values.newPassword)) {
          errors.newPassword = 'Обязательное поле';
        }
        if (isNotDefinedString(values.repeatPassword)) {
          errors.repeatPassword = 'Обязательное поле';
        }
        if (values.repeatPassword !== values.newPassword) {
          errors.newPassword = 'Пароли не совпадают';
          errors.repeatPassword = 'Пароли не совпадают';
        }
        return errors;
      },
    };
  }, [update]);

  const formManager = useFormik<ChangePasswordFormValues>({
    initialValues,
    onSubmit,
    validate,
  });
  const { submitForm } = formManager;

  return (
    <div>
      <Title className={styles.title}>{'Изменить пароль'}</Title>
      <ChangePasswordForm formManager={formManager} />
      <Button type="primary" loading={loading} onClick={submitForm}>
        {'Изменить'}
      </Button>
    </div>
  );
});

ChangePasswordCompletedForm.displayName = 'ChangePasswordCompletedForm';
