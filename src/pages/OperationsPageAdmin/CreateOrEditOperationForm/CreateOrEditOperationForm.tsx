import { useFormik } from "formik";
import React, { useMemo } from "react";
import { FC } from "react";
import { Button } from "antd";

import { CreateOperationFormValues } from "src/features/forms/OperationForm/types";
import { OperationForm } from "src/features/forms/OperationForm/OperationForm";
import { Operation } from "src/server.types";

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
    name: initialValues.name ?? '',
    desc: initialValues.desc ?? '',
    amount: initialValues.amount ?? 0,
    date: initialValues.date ?? '',
    type: initialValues.type ?? 'Cost' as unknown as Operation,
    categoryId: initialValues.categoryId ?? '',
  };

  const validate = useMemo(() => {
    return (values: CreateOperationFormValues) => {
      const errors: Partial<Record<keyof CreateOperationFormValues, string>> = {};

      if (!values.amount && values.amount !== 0) {
        errors.amount = 'Обязательное поле';
      } else if (isNaN(Number(values.amount))) {
        errors.amount = 'Должно быть числом';
      }

      if (!values.categoryId) {
        errors.categoryId = 'Обязательное поле';
      }

      if (!values.name) {
        errors.name = 'Обязательное поле';
      }

      if (!values.date) {
        errors.date = 'Обязательное поле';
      }

      if (!values.type) {
        errors.type = 'Обязательное поле';
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