import React, { memo, useMemo } from 'react';
import cn from 'clsx';
import { useMutation } from '@apollo/client';
import { FormikConfig, useFormik } from 'formik';
import { Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { tokenActions } from 'src/app/store/token';
import { profileActions } from 'src/app/store/profile';
import { NavigationState } from 'src/app/navigation/types';
import { AuthForm, AuthFormErrors, AuthFormValues } from 'src/features/forms/AuthForm';
import { isLongEnough, isNotDefinedString } from 'src/utils/validation';
import { createErrorHandlers } from 'src/utils/createErrorHandlers';
import { extractSignUp, SIGN_UP, SignUpResponse, SignUpVars } from '../connections';

import style from './SingUpBlock.module.css';

export type SingUpBlockProps = {
  className?: string;
};

const initialValues: AuthFormValues = {
  email: undefined,
  password: undefined,
};

export const SingUpBlock = memo<SingUpBlockProps>(({ className }) => {
  const [signUp, { loading }] = useMutation<SignUpResponse, SignUpVars>(SIGN_UP, { fetchPolicy: 'no-cache' });
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
        signUp({ variables: { email: values.email, password: values.password } })
          .then((res) => {
            /** Извлечение данных авторизации. */
            const result = extractSignUp(res.data);
            if (result) {
              /** Сохранение токена. */
              dispatch(tokenActions.set(result.token));
              /** Сохранение данных. */
              dispatch(profileActions.set(result.profile));
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
  }, [dispatch, location.state, navigate, signUp]);

  const formik = useFormik<AuthFormValues>({
    onSubmit,
    initialValues,
    validate,
  });

  const { submitForm } = formik;

  return (
    <div className={cn(style.root, className)}>
      <AuthForm formManager={formik} />
      <div className={style.bottom}>
        <Button className={style.submit} loading={loading} type="primary" onClick={submitForm}>
          {'Зарегестрироваться'}
        </Button>
      </div>
    </div>
  );
});
