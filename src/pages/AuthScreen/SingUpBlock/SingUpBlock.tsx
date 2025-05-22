import React, { memo, useMemo } from 'react';
import cn from 'clsx';
import { FormikConfig, useFormik } from 'formik';
import { Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { AuthForm, AuthFormErrors, AuthFormValues } from 'features/forms/AuthForm';
import { isLongEnough, isNotDefinedString, isValidEmail } from 'utils/validation';
import { tokenSelectors } from 'app/store/token';

import style from './SingUpBlock.module.css';

export type SingUpBlockProps = {
  className?: string;
};

const initialValues: AuthFormValues = {
  email: undefined,
  password: undefined,
};

export const SingUpBlock = memo<SingUpBlockProps>(({ className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const token = useSelector(tokenSelectors.get);

  const { onSubmit, validate } = useMemo<Pick<FormikConfig<AuthFormValues>, 'onSubmit' | 'validate'>>(() => {
    return {
      onSubmit: async (values, { resetForm }) => {
        try {
          dispatch({
            type: 'auth/signUp',
            payload: {
              email: values.email,
              password: values.password,
              mode: 'signup',
            },
          });

          if (token) {
            resetForm();
            navigate((location.state as any)?.from || '/');
          }
        } catch (error: any) {
          message.error(error.message || 'Произошла ошибка');
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
    <div className={cn(style.root, className)}>
      <AuthForm formManager={formik} />
      <div className={style.bottom}>
        <Button className={style.submit} type="primary" onClick={submitForm}>
          {'Зарегестрироваться'}
        </Button>
      </div>
    </div>
  );
});

SingUpBlock.displayName = 'SingUpBlock';
