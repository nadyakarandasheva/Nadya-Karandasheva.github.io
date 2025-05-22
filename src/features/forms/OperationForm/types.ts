import { FormProps } from 'src/features/forms/types';
import { Operation } from 'src/server.types';

export type CreateOperationFormValues = {
  name?: string;
  desc?: string;
  amount?: number;
  date?: string; // дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
  type?: Operation;
  categoryId?: string;
};

export type CreateOperationFormErrors = Record<keyof CreateOperationFormValues, string>;
export type CreateOperationFormTouched = Record<keyof CreateOperationFormValues, boolean>;

export type CreateOperationFormProps = FormProps<CreateOperationFormValues>;