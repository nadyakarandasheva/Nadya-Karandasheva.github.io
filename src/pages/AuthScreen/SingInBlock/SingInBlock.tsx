import React, { memo, useMemo } from 'react';
import cn from 'clsx';
import { FormikConfig, useFormik } from 'formik';
import { Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { AuthForm, AuthFormErrors, AuthFormValues } from 'features/forms/AuthForm';
import { isLongEnough, isNotDefinedString, isValidEmail } from 'utils/validation';
import { createErrorHandlers } from 'utils/createErrorHandlers';
import { tokenActions } from 'app/store/token';
import { profileActions } from 'app/store/profile';
import { authApi } from 'app/client/api/auth-api';

import styles from './SingInBlock.module.css';

export type SingInBlockProps = {
  className?: string;
};

const initialValues: AuthFormValues = {
  email: undefined,
  password: undefined,
};

/**
 * Компонент формы входа.
 */
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
          const token = await authApi.signIn(values.email, values.password);
          dispatch(tokenActions.set(token));

          const profile = await authApi.getProfile(token);
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

SingInBlock.displayName = 'SingInBlock';
