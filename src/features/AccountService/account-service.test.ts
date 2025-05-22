import { AccountService } from './AccountService';
import { UserType, ProductType } from './account-service.enum';

describe('AccountService', () => {
  let service: AccountService;

  beforeEach(() => {
    service = new AccountService();
    service.reset();
  });

  describe('Глобальные скидки', () => {
    it.each(Object.values(UserType))('устанавливает и получает глобальную скидку для %s', (userType) => {
      service.setGlobalDiscount(userType, 10);
      expect(service.getGlobalDiscount(userType)).toBe(10);
    });

    it('возвращает 0, если глобальная скидка не задана', () => {
      expect(service.getGlobalDiscount(UserType.Standard)).toBe(0);
    });
  });

  describe('Скидки на товары', () => {
    const cases: [UserType, ProductType][] = Object.values(UserType).flatMap((userType) =>
      Object.values(ProductType).map((productType) => [userType, productType] as [UserType, ProductType])
    );

    it.each(cases)('устанавливает и получает скидку для пользователя %s на товар %s', (userType, productType) => {
      service.setProductDiscount(userType, productType, 5);
      expect(service.getProductDiscount(userType, productType)).toBe(5);
    });

    it('возвращает 0, если скидка на товар не задана', () => {
      expect(service.getProductDiscount(UserType.Gold, ProductType.Toy)).toBe(0);
    });
  });

  describe('Итоговая скидка', () => {
    it('возвращает сумму глобальной и товарной скидки', () => {
      service.setGlobalDiscount(UserType.Premium, 10);
      service.setProductDiscount(UserType.Premium, ProductType.Food, 5);
      expect(service.getTotalDiscount(UserType.Premium, ProductType.Food)).toBe(15);
    });

    it('возвращает только глобальную скидку, если товарная не задана', () => {
      service.setGlobalDiscount(UserType.Standard, 8);
      expect(service.getTotalDiscount(UserType.Standard, ProductType.Car)).toBe(8);
    });

    it('возвращает только товарную скидку, если глобальная не задана', () => {
      service.setProductDiscount(UserType.Gold, ProductType.Toy, 7);
      expect(service.getTotalDiscount(UserType.Gold, ProductType.Toy)).toBe(7);
    });

    it('возвращает 0, если нет ни глобальной, ни товарной скидки', () => {
      expect(service.getTotalDiscount(UserType.Free, ProductType.Car)).toBe(0);
    });
  });
});
