import { CreateOrUpdateCategoryParams, Filters } from 'server.types';
import { BASE_URL } from './common';

/**
 * Запросы для операций.
 */
export const operationsApi = {
  async fetchOperations(token?: string, filters: Filters = {}) {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined) {
        if (typeof value === 'object') {
          params.append(key, JSON.stringify(value));
        } else {
          params.append(key, String(value));
        }
      }
    }

    const res = await fetch(`${BASE_URL}/operations?${params.toString()}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    if (!res.ok) {
      throw new Error('Не удалось загрузить операции');
    }

    return res.json();
  },

  async fetchOperationById(id: string, token?: string) {
    const res = await fetch(`${BASE_URL}/operations/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    if (!res.ok) {
      throw new Error('Не удалось загрузить операцию');
    }

    return res.json();
  },

  async createOperation(token: string, params: any) {
    const res = await fetch(`${BASE_URL}/operations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error('Не удалось создать операцию');
    return res.json();
  },

  async updateOperation(token: string, id: string, params: any) {
    const res = await fetch(`${BASE_URL}/operations/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error('Не удалось обновить операцию');
    return res.json();
  },

  async fetchCategories(token: string) {
    const res = await fetch(`${BASE_URL}/categories`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });

    if (!res.ok) throw new Error('Не удалось получить категории');

    return res.json();
  },

  async createCategory(token: string, params: CreateOrUpdateCategoryParams) {
    const res = await fetch(`${BASE_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Ошибка создания категории');
    }

    return res.json();
  },

  async updateCategory(token: string, id: string, params: any) {
    const res = await fetch(`${BASE_URL}/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Ошибка редактирования категории');
    }

    return res.json();
  },
};
