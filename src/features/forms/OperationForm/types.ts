import { FormProps } from 'src/features/forms/types';

export type CreateOperationFormValues = {
  amount: number;
  category: string;
  title: string;
  description: string;
  date: string;
};

export type CreateOperationFormErrors = Record<keyof CreateOperationFormValues, string>;
export type CreateOperationFormTouched = Record<keyof CreateOperationFormValues, boolean>;

export type CreateOperationFormProps = FormProps<CreateOperationFormValues>;