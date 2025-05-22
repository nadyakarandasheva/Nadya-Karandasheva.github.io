import React, { FC, useMemo } from 'react';
import { useFormik } from 'formik';
import { Button, Input } from 'antd';

import { FormItem } from 'shared/FormItem/FormItem';

export type CreateOrEditCategoryFormValues = {
  name: string;
};

type CreateOrEditCategoryFormProps = {
  onSubmit: (values: CreateOrEditCategoryFormValues) => void;
  initialValues?: Partial<CreateOrEditCategoryFormValues>;
  id?: string;
};

/**
 * Форма создания или редактирования категории.
 * @param param0 
 * @returns 
 */
export const CreateOrEditCategoryForm: FC<CreateOrEditCategoryFormProps> = ({ onSubmit, initialValues }) => {
  const formInitialValues: CreateOrEditCategoryFormValues = {
    name: initialValues?.name || ''
  }

  const validate = useMemo(() => {
    return (values: CreateOrEditCategoryFormValues) => {
      const errors: Partial<Record<keyof CreateOrEditCategoryFormValues, string>> = {};
      if (!values.name.trim()) {
        errors.name = 'Введите название категории';
      }
      return errors;
    };
  }, []);


  const formManager = useFormik<CreateOrEditCategoryFormValues>({
    initialValues: formInitialValues,
    onSubmit,
    validate,
    enableReinitialize: true,
  });

  const { submitForm, touched, errors, handleChange, handleBlur, values, isValid, isSubmitting } = formManager;

  return (
    <form onSubmit={submitForm}>
      <FormItem
        title="Название категории"
        required
        validateStatus={touched.name && errors.name ? 'error' : ''}
        help={touched.name && errors.name ? errors.name : ''}
      >
        <Input
          name="name"
          type="text"
          placeholder="Укажите название"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
        />
      </FormItem>
      <Button type="primary" onClick={submitForm} disabled={!isValid || isSubmitting}>
        Сохранить
      </Button>
    </form>
  );
};
