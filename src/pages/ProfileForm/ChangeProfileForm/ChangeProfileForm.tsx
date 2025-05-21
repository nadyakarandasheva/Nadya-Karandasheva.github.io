import React, { useEffect, useMemo } from "react";
import { FC } from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { FormikConfig, useFormik } from "formik";

import { profileActions, profileSelectors } from "src/app/store/profile";
import { ProfileForm } from "src/features/forms/ProfileForm/ProfileForm";
import { Title } from "src/shared/Title/Title";
import { UPDATE_PROFILE, UpdateProfileResponse, UpdateProfileVars } from "./connection";
import { ProfileFormErrors, ProfileFormValues } from "src/features/forms/ProfileForm/types";
import { isNotDefinedString } from "src/utils/validation";

import styles from './ChangeProfileForm.module.css';
import { tokenSelectors } from "src/app/store/token";

/**
 * Компонент формы изменения провиля.
 * @returns 
 */
export const ChangeProfileForm: FC = () => {
  const token = useSelector(tokenSelectors.get);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      /** моковые данные профиля */
      dispatch(profileActions.set({
        name: 'Надежда',
        about: 'Что-то о себе',
        id: "1",
        signUpDate: "",
        email: "test_nadya@mail.ru",
      }));
    } else {
      dispatch(profileActions.clear());
    }
  }, [token, dispatch]);

  const profile = useSelector(profileSelectors.get);

  const [update, { loading }] = useMutation<UpdateProfileResponse, UpdateProfileVars>(UPDATE_PROFILE);

  const { onSubmit, validate, initialValues } = useMemo<
    Pick<FormikConfig<ProfileFormValues>, 'onSubmit' | 'validate' | 'initialValues'>
  >(() => {
    return {
      initialValues: {
        name: profile?.name,
        about: profile?.about,
      },
      onSubmit: (values) => {
        console.log('Изменение профиля', values)
      },
      validate: (values) => {
        const errors = {} as ProfileFormErrors;
        if (isNotDefinedString(values.name)) {
          errors.name = 'Обязательное поле';
        }
        return errors;
      },
    };
  }, [profile, update]);

  const formManager = useFormik<ProfileFormValues>({
    initialValues,
    onSubmit,
    validate,
  });

  const { submitForm, setValues } = formManager;

  useEffect(() => {
    setValues({ name: profile?.name, about: profile?.about });
  }, [profile, setValues]);

  return (
    <div>
      <Title className={styles.title}>{'Изменить профиль'}</Title>
      <ProfileForm formManager={formManager} />
      <Button type="primary" loading={loading} onClick={submitForm} className={styles.formButton}>
        {'Сохранить'}
      </Button>
    </div>
  )
}