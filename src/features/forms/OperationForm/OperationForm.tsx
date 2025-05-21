import React from 'react';
import { memo } from 'react';
import cn from 'clsx';

import { AmountField } from './AmountField/AmountField';
import { CategoryField } from './CategoryField/CategoryField';
import { DateField } from './DateField/DateField';
import { TitleField } from './TitleField/TitleField';
import { DescriptionField } from './DescriptionField/DescriptionField';

import { CreateOperationFormProps } from './types';

import styles from './OperationForm.module.css';

export const OperationForm = memo<CreateOperationFormProps>(
  ({ className, formManager, formElement, autoFocusElement, disabled }) => {
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
          autoFocusElement={autoFocusElement}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.category}
          errors={errors.category}
          submitCount={submitCount}
          touched={touched.category}
          disabled={disabled}
        />
        <TitleField
          onPressEnter={submitForm}
          autoFocusElement={autoFocusElement}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.title}
          errors={errors.title}
          submitCount={submitCount}
          touched={touched.title}
          disabled={disabled}
        />
        <DescriptionField
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.description}
          errors={errors.description}
          submitCount={submitCount}
          touched={touched.description}
          disabled={disabled}
        />
      </form>
    );
  });
