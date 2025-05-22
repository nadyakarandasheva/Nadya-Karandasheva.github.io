import React from 'react';
import { useFormik } from 'formik';

export type CreateCategoryFormValues = {
  name: string;
  photo?: string;
};

type Props = {
  onSubmit: (values: CreateCategoryFormValues) => void;
  initialValues?: Partial<CreateCategoryFormValues>;
};

export const CreateCategoryForm: React.FC<Props> = ({ onSubmit, initialValues }) => {
  const formik = useFormik<CreateCategoryFormValues>({
    initialValues: {
      name: initialValues?.name || '',
      photo: initialValues?.photo || '',
    },
    validate: (values) => {
      const errors: Partial<Record<keyof CreateCategoryFormValues, string>> = {};
      if (!values.name.trim()) {
        errors.name = 'Введите название категории';
      }
      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="name">Название категории</label>
        <br />
        <input
          id="name"
          name="name"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Введите название"
        />
        {formik.touched.name && formik.errors.name && <div style={{ color: 'red' }}>{formik.errors.name}</div>}
      </div>

      <div>
        <label htmlFor="photo">Фото (URL)</label>
        <br />
        <input
          id="photo"
          name="photo"
          type="text"
          value={formik.values.photo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Ссылка на фото"
        />
      </div>

      <button type="submit" disabled={!formik.isValid || formik.isSubmitting}>
        Добавить категорию
      </button>
    </form>
  );
};
