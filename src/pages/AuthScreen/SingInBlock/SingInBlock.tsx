import React, { memo, useMemo } from 'react';
import cn from 'clsx';
import { useMutation } from '@apollo/client';
import { FormikConfig, useFormik } from 'formik';
import { Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { tokenActions } from 'src/app/store/token';
import { NavigationState } from 'src/app/navigation/types';
import { AuthForm, AuthFormErrors, AuthFormValues } from 'src/features/forms/AuthForm';
import { isLongEnough, isNotDefinedString } from 'src/utils/validation';
import { extractSignIn, SIGN_IN, SignInResponse, SignInVars } from '../connections';
import { createErrorHandlers } from 'src/utils/createErrorHandlers';

import styles from './SingInBlock.module.css';

export type SingInBlockProps = {
  className?: string;
};

const initialValues: AuthFormValues = {
  email: undefined,
  password: undefined,
};

export const SingInBlock = memo<SingInBlockProps>(({ className }) => {
  const [signIn, { loading }] = useMutation<SignInResponse, SignInVars>(SIGN_IN, { fetchPolicy: 'no-cache' });
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
      onSubmit: (values, { resetForm }) => {
        signIn({ variables: { email: values.email, password: values.password } })
          .then((res) => {
            /** Извлечение данных. */
            const result = extractSignIn(res.data);
            if (result) {
              /** Сохранение токена. */
              dispatch(tokenActions.set(result.token));
              /** Сохранение данных. */
            }
            resetForm();
            navigate((location.state as NavigationState)?.from || '/');
          })
          .catch(catcher);
      },
      validate: (values) => {
        const errors = {} as AuthFormErrors;
        if (isNotDefinedString(values.email)) {
          errors.email = 'Обязательное поле';
        }
        if (isNotDefinedString(values.password)) {
          errors.password = 'Обязательное поле';
        } else if (!isLongEnough(values.password)) {
          errors.password = 'Слишком короткий пароль';
        }
        return errors;
      },
    };
  }, [dispatch, location.state, navigate, signIn]);

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
        <Button className={styles.submit} loading={loading} type="primary" onClick={submitForm}>
          {'Войти'}
        </Button>
      </div>
    </div>
  );
});
