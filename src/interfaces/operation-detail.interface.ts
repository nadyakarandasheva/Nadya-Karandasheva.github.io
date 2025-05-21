import { IOperationSummary } from "./operation-summary.interafce";

/**
 * Интерфейс деталей операции.
 * @prop {boolean | undefined} isDisabled - Неактвна ли кнопка?
 * @prop {() => void | undefined} onEdit - Функция редактирования.
 */
export interface IOperationDetail extends IOperationSummary {
  isDisabled?: boolean;
  onEdit?: () => void;
}