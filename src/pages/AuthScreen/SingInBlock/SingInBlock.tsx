import React, { memo, useMemo } from 'react';
import cn from 'clsx';
import { FormikConfig, useFormik } from 'formik';
import { Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { AuthForm, AuthFormErrors, AuthFormValues } from 'src/features/forms/AuthForm';
import { isLongEnough, isNotDefinedString, isValidEmail } from 'src/utils/validation';
import { createErrorHandlers } from 'src/utils/createErrorHandlers';
import { tokenActions } from 'src/app/store/token';
import { profileActions } from 'src/app/store/profile';
import { api } from 'src/app/client/auth-api';

import styles from './SingInBlock.module.css';

export type SingInBlockProps = {
  className?: string;
};

const initialValues: AuthFormValues = {
  email: undefined,
  password: undefined,
};

export const SingInBlock = memo<SingInBlockProps>(({ className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { onSubmit, validate } = useMemo<Pick<FormikConfig<AuthFormValues>, 'onSubmit' | 'validate'>>(() => {
    const { catcher } = createErrorHandlers((code, _, error) => {
      if (code === null) {
        message.error(`errors.${error.message}`);
      } else {
        message.error(`errors.${code}`);
      }
    });

    return {
      onSubmit: async (values, { resetForm }) => {
        try {
          const token = await api.signIn(values.email, values.password);
          dispatch(tokenActions.set(token));

          const profile = await api.getProfile(token);
          dispatch(profileActions.set(profile));

          if (token) {
            resetForm();
            navigate((location.state as any)?.from || '/');
          }
        } catch (error: any) {
          message.error(error.message || 'Ошибка входа');
        }
      },
      validate: (values) => {
        const errors = {} as AuthFormErrors;
        if (isNotDefinedString(values.email)) {
          errors.email = 'Обязательное поле';
        }
        if (!isValidEmail(values.email)) {
          errors.email = 'Некорректный email';
        }
        if (isNotDefinedString(values.password)) {
          errors.password = 'Обязательное поле';
        } else if (!isLongEnough(values.password)) {
          errors.password = 'Слишком короткий пароль';
        }
        return errors;
      },
    };
  }, [dispatch, location.state, navigate]);

  const formik = useFormik<AuthFormValues>({
    onSubmit,
    initialValues,
    validate,
  });

  const { submitForm } = formik;

  return (
    <div className={cn(styles.root, className)}>
      <AuthForm formManager={formik} />
      <div className={styles.bottom}>
        <Button className={styles.submit} type="primary" onClick={submitForm}>
          {'Войти'}
        </Button>
      </div>
    </div>
  );
});
