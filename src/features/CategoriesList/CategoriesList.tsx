import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';

import { CreateOrEditCategoryForm, CreateOrEditCategoryFormValues } from 'pages/OperationsPageAdmin/CreateOrEditCategoryForm/CreateOrEditCategoryForm';
import { operationsActions } from 'app/store/sagas/operations/operations';
import { Modal } from 'shared/modal/Modal';
import { RootState } from 'app/store';
import { Category } from 'server.types';

import styles from './CategoriesList.module.css';

/**
 * Компонент списка категорий.
 * @returns
 */
export const CategoriesList = () => {
  const [categoryData, setCategoryData] = useState<Category>(null);

  const dispatch = useDispatch();

  const categories = useSelector((state: RootState) => state.operations.categories);

  useEffect(() => {
    dispatch(operationsActions.fetchCategories());
  }, [dispatch]);

  const handleCreateCategory = (values: CreateOrEditCategoryFormValues) => {
    dispatch(
      operationsActions.updateCategory({
        ...values,
        id: categoryData.id
      })
    );

    setTimeout(() => setCategoryData(null), 2000);
  };


  return (
    <>
      <div className={styles.categoriesListContainer}>
        {categories.map((category) => <Button type="text" onClick={() => setCategoryData(category)}>{category.name}</Button>)}
      </div>
      {categoryData && (
        <Modal onClose={() => setCategoryData(null)}>
          <CreateOrEditCategoryForm onSubmit={handleCreateCategory} id={categoryData.id} initialValues={categoryData} />
        </Modal>
      )}
    </>
  );
};
