import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category, CreateCategoryParams } from './../../../../server.types';

interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error?: string;
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: undefined,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    fetchCategoriesRequest(state) {
      state.loading = true;
      state.error = undefined;
    },
    fetchCategoriesSuccess(state, action: PayloadAction<Category[]>) {
      state.loading = false;
      state.categories = action.payload;
    },
    fetchCategoriesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    createCategoryRequest(state, action: PayloadAction<CreateCategoryParams>) {
      state.loading = true;
      state.error = undefined;
    },
    createCategorySuccess(state, action: PayloadAction<Category>) {
      state.loading = false;
      state.categories.push(action.payload);
    },
    createCategoryFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const categoriesActions = categoriesSlice.actions;
export default categoriesSlice.reducer;
