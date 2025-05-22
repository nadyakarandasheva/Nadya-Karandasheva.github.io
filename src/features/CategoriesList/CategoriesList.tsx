import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';

import { CreateOrEditCategoryForm, CreateOrEditCategoryFormValues } from 'pages/OperationsPageAdmin/CreateOrEditCategoryForm/CreateOrEditCategoryForm';
import { operationsActions } from 'app/store/sagas/operations/operations';
import { Modal } from 'shared/modal/Modal';
import { RootState } from 'app/store';

import styles from './CategoriesList.module.css';

/**
 * Компонент списка категорий.
 * @returns
 */
export const CategoriesList = () => {
  const [categoryId, setCategoryId] = useState<string>(null);

  const dispatch = useDispatch();

  const categories = useSelector((state: RootState) => state.operations.categories);

  useEffect(() => {
    dispatch(operationsActions.fetchCategories());
  }, [dispatch]);

  const handleCreateCategory = (values: CreateOrEditCategoryFormValues) => {
    dispatch(
      operationsActions.updateCategory({
        ...values,
        id: categoryId
      })
    );

    setTimeout(() => setCategoryId(null), 2000);
  };


  return (
    <div className={styles.categoriesListContainer}>
      {categories.map((category) => <>
        <Button type="text" onClick={() => setCategoryId(category?.id)}>{category.name}</Button>
        {categoryId && (
          <Modal onClose={() => setCategoryId(null)}>
            <CreateOrEditCategoryForm onSubmit={handleCreateCategory} id={category.id} initialValues={category} />
          </Modal>
        )}
      </>)}
    </div>
  );
};
