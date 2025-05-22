import React, { useEffect, memo } from 'react';
import { Select } from 'antd';
import { FormikHandlers } from 'formik';

import { FormItem } from 'shared/FormItem/FormItem';
import { getValidates } from 'utils/validation';

import { CreateOperationFormProps } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/store';
import { operationsActions } from 'app/store/sagas/operations/operations';

export type CategoryFieldProps = Pick<CreateOperationFormProps, 'disabled'> & {
  submitCount: number;
  touched: boolean;
  errors: string;
  value: string;
  onPressEnter: () => void;
  onChange: FormikHandlers['handleChange'];
  onBlur: FormikHandlers['handleBlur'];
};

export const CategoryField = memo<CategoryFieldProps>(
  ({ onChange, onBlur, touched, value, errors, disabled, submitCount }) => {
    const dispatch = useDispatch();

    const categories = useSelector((state: RootState) => state.operations.categories);

    useEffect(() => {
      dispatch(operationsActions.fetchCategoriesRequest());
    }, [dispatch]);

    const { validateStatus, help } = getValidates(errors, touched, submitCount);

    const handleChange = (categoryId: string) => {
      onChange({
        target: {
          name: 'categoryId',
          value: categoryId,
        },
      } as React.ChangeEvent<HTMLInputElement>);
    };

    return (
      <FormItem title="Категория" required validateStatus={validateStatus} help={help}>
        <Select
          showSearch
          placeholder="Выберите категорию"
          optionFilterProp="children"
          disabled={disabled}
          value={value || undefined}
          onChange={handleChange}
          onBlur={onBlur}
          filterOption={(input, option) =>
            (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())
          }
          style={{ width: '100%' }}
        >
          {categories.map((category) => (
            <Select.Option key={category.id} value={category.id}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
      </FormItem>
    );
  }
);

CategoryField.displayName = 'CategoryField';
