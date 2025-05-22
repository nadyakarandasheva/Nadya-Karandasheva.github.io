import React, { memo } from 'react';
import cn from 'clsx';

import { AmountField } from './AmountField/AmountField';
import { CategoryField } from './CategoryField/CategoryField';
import { DateField } from './DateField/DateField';
import { TitleField } from './TitleField/TitleField';
import { DescriptionField } from './DescriptionField/DescriptionField';
import { OperationTypeField } from './OperationTypeField/OperationTypeField';

import { CreateOperationFormProps } from './types';

import styles from './OperationForm.module.css';

/**
 * Форма создания/редактирования операции.
 */
export const OperationForm = memo<CreateOperationFormProps>(
  ({ className, formManager, formElement, autoFocusElement, disabled }: CreateOperationFormProps) => {
    const { values, touched, errors, submitCount, handleBlur, handleSubmit, handleChange, submitForm } = formManager;

    return (
      <form ref={formElement} onSubmit={handleSubmit} className={cn(styles.form, className)}>
        <DateField
          onPressEnter={submitForm}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.date}
          errors={errors.date}
          submitCount={submitCount}
          touched={touched.date}
          disabled={disabled}
        />
        <AmountField
          onPressEnter={submitForm}
          autoFocusElement={autoFocusElement}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.amount}
          errors={errors.amount}
          submitCount={submitCount}
          touched={touched.amount}
          disabled={disabled}
        />
        <CategoryField
          onPressEnter={submitForm}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.categoryId}
          errors={errors.categoryId}
          submitCount={submitCount}
          touched={touched.categoryId}
          disabled={disabled}
        />
        <TitleField
          onPressEnter={submitForm}
          autoFocusElement={autoFocusElement}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.name}
          errors={errors.name}
          submitCount={submitCount}
          touched={touched.name}
          disabled={disabled}
        />
        <DescriptionField
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.desc}
          errors={errors.desc}
          submitCount={submitCount}
          touched={touched.desc}
          disabled={disabled}
        />
        <OperationTypeField
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.type}
          errors={errors.type}
          submitCount={submitCount}
          touched={touched.type}
          disabled={disabled}
        />
      </form>
    );
  }
);

OperationForm.displayName = 'OperationForm';
