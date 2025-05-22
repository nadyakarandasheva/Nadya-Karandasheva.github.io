import { ProductType, UserType } from './account-service.enum';

export class AccountService {
  private globalDiscounts: Map<UserType, number> = new Map();
  private productDiscounts: Map<UserType, Map<ProductType, number>> = new Map();

  /**
   * Установка глобальной скидки для типа пользователя.
   * @param userType
   * @param discount
   */
  setGlobalDiscount(userType: UserType, discount: number): void {
    this.globalDiscounts.set(userType, discount);
  }

  /**
   * Установка скидки на конкретный товар для типа пользователя.
   * @param userType
   * @param productType
   * @param discount
   */
  setProductDiscount(userType: UserType, productType: ProductType, discount: number): void {
    if (!this.productDiscounts.has(userType)) {
      this.productDiscounts.set(userType, new Map());
    }
    const discountsForUser = this.productDiscounts.get(userType)!;
    discountsForUser.set(productType, discount);
  }

  /**
   * Получение глобальной скидки пользователя.
   * @param userType
   * @returns
   */
  getGlobalDiscount(userType: UserType): number {
    return this.globalDiscounts.get(userType) ?? 0;
  }

  /**
   * Получение скидки на товар для пользователя.
   * @param userType
   * @param productType
   * @returns
   */
  getProductDiscount(userType: UserType, productType: ProductType): number {
    return this.productDiscounts.get(userType)?.get(productType) ?? 0;
  }

  /**
   * Получение полной скидки с учетом пользовательской и товарной.
   * @param userType
   * @param productType
   * @returns
   */
  getTotalDiscount(userType: UserType, productType: ProductType): number {
    return this.getGlobalDiscount(userType) + this.getProductDiscount(userType, productType);
  }

  /** Очистка всех скидок (для тестов) */
  reset(): void {
    this.globalDiscounts.clear();
    this.productDiscounts.clear();
  }
}
