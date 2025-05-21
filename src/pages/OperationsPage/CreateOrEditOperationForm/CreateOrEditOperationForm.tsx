import { useFormik } from "formik";
import React, { useMemo } from "react";
import { FC } from "react";
import { Button } from "antd";

import { CreateOperationFormErrors, CreateOperationFormValues } from "src/features/forms/OperationForm/types";
import { OperationForm } from "src/features/forms/OperationForm/OperationForm";

interface CreateOrEditOperationFormProps {
  initialValues?: Partial<CreateOperationFormValues>;
  isEdit?: boolean;
  onSubmit: (values: CreateOperationFormValues) => void;
};

export const CreateOrEditOperationForm: FC<CreateOrEditOperationFormProps> = ({
  initialValues = {},
  onSubmit,
}) => {
  const formInitialValues: CreateOperationFormValues = {
    id: initialValues.id ?? 0,
    amount: initialValues.amount ?? 0,
    category: initialValues.category ?? '',
    title: initialValues.title ?? '',
    description: initialValues.description ?? '',
    date: initialValues.date ?? '',
  };

  const validate = useMemo(() => {
    return (values: CreateOperationFormValues) => {
      const errors = {} as CreateOperationFormErrors;

      if (!values.amount) {
        errors.amount = 'Обязательное поле';
      } else if (isNaN(Number(values.amount))) {
        errors.amount = 'Должно быть числом';
      }

      if (!values.category) {
        errors.category = 'Обязательное поле';
      }

      if (!values.title) {
        errors.title = 'Обязательное поле';
      }

      if (!values.date) {
        errors.date = 'Обязательное поле';
      }

      return errors;
    };
  }, []);

  const formManager = useFormik<CreateOperationFormValues>({
    initialValues: formInitialValues,
    onSubmit,
    validate,
    enableReinitialize: true,
  });

  const { submitForm } = formManager;

  return (
    <div>
      <OperationForm formManager={formManager} />
      <Button type="primary" onClick={submitForm} >
        {'Сохранить'}
      </Button>
    </div>
  )
}