import { Profile, ServerErrors } from 'server.types';

const BASE_URL = 'http://19429ba06ff2.vps.myjino.ru/api';
const COMMAND_ID = '2ee70484-c6f3-45db-8cda-ac49dfdc6a0d';

/**
 * Обработка ошибок.
 * @param {Response} res
 * @returns
 */
async function parseError(res: Response): Promise<Error> {
  try {
    const data: ServerErrors = await res.json();
    const first = data.errors?.[0];

    const error = new Error(first?.message || 'Ошибка сервера');
    (error as any).code = first?.extensions?.code;
    (error as any).fieldName = first?.fieldName;
    return error;
  } catch {
    return new Error('Ошибка сервера');
  }
}

/**
 * Запросы для аутентификации и авторизации.
 */
export const api = {
  async signUp(email: string, password: string): Promise<string> {
    const res = await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, commandId: COMMAND_ID }),
    });

    if (!res.ok) {
      throw await parseError(res);
    }

    const data = await res.json();
    return data.token;
  },

  async signIn(email: string, password: string): Promise<string> {
    const res = await fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw await parseError(res);
    }

    const data = await res.json();
    return data.token;
  },

  async getProfile(token: string): Promise<Profile> {
    const res = await fetch(`${BASE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw await parseError(res);
    }

    return res.json();
  },
};
