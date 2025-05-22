/**
 * Интерфейс краткого отображения операции.
 * @prop {number} id - Идентификатор.
 * @prop {number} amount - Сумма операции.
 * @prop {string} category - Категория.
 * @prop {string} title - Название.
 * @prop {string} description - Описание.
 */
export interface IOperationSummary {
  id: number;
  amount: number;
  category: string;
  title: string;
  description: string;
  date: string;
}
