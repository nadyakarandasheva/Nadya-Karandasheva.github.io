/**
 * Функции написанные здесь пригодятся на последующих уроках
 * С помощью этих функций мы будем добавлять элементы в список для проверки динамической загрузки
 * Поэтому в идеале чтобы функции возвращали случайные данные, но в то же время не абракадабру.
 * В целом сделайте так, как вам будет удобно.
 * */

/**
 * Тип категории.
 * @prop {string} id - Идентификатор.
 * @prop {string} name - Имя.
 * @prop {string | undefined} photo - Фотография.
 */
export type Category = {
  id: string,
  name: string,
  photo?: string
}

/**
 * Тип продукта.
 * @prop {string} id - Идентификатор.
 * @prop {string} name - Имя.
 * @prop {string} photo - Фотография.
 * @prop {string} createdAt - Когда создано.
 * @prop {number} price - Цена.
 * @prop {Category} category - Категория.
 * @prop {number | undefined} oldPrice - Старая цена.
 * @prop {string | undefined} desc - Скидка.
 */
export type Product = {
  id: string,
  name: string,
  photo: string,
  createdAt: string,
  price: number,
  category: Category,
  oldPrice?: number,
  desc?: string
}

/**
 * Тип операции - Трата.
 * @prop {string} id - Идентификатор.
 * @prop {string} name - Имя.
 * @prop {string} createdAt - Когда создано.
 * @prop {number} amount - Количество.
 * @prop {Category} category - Категория.
 * @prop {string} type - Тип.
 * @prop {string | undefined} desc - Скидка.
 */
export type Cost = {
  id: string;
  name: string;
  createdAt: string;
  amount: number;
  category: Category;
  type: 'Cost';
  desc?: string;
};

/**
 * Тип операции - Доход.
 * @prop {string} id - Идентификатор.
 * @prop {string} name - Имя.
 * @prop {string} createdAt - Когда создано.
 * @prop {number} amount - Количество.
 * @prop {Category} category - Категория.
 * @prop {string} type - Тип.
 * @prop {string | undefined} desc - Скидка.
 */
export type Profit = {
  id: string;
  name: string;
  createdAt: string;
  amount: number;
  category: Category;
  type: 'Profit';
  desc?: string;
};

/** Тип операции. */
export type Operation = Cost | Profit;

/**
 * Создает случайный продукт (Product).
 * @param {string} createdAt - Дата создания.
 * @returns {Product} - Продукт.
 *  */
export const createRandomProduct = (createdAt: string): Product => {

  const categoryNames = ['category1', 'category2', 'category3'];

  const categoryName = categoryNames[Math.floor(Math.random() * categoryNames.length)];

  const category: Category = {
    id: Math.random().toString(),
    name: categoryName,
    photo: `https://example.com/${categoryName}.jpg`,
  };

  // Цена от 0 до 5000
  const price = Math.floor(Math.random() * 5000);

  // Старая цена с вероятностью 50%
  const oldPrice = Math.random() > 0.5 ? price + Math.floor(Math.random() * 10000) : undefined;

  return {
    id: Math.random().toString(),
    name: `Product ${Math.floor(Math.random() * 1000)}`,
    photo: '',
    createdAt: createdAt,
    price: price,
    oldPrice: oldPrice,
    category: category,
    desc: oldPrice ? 'Special discount' : undefined,
  };
};


/**
 * Создает случайную операцию (Operation).
 * @param {string} createdAt - Дата создания.
 * @returns {Operation} - Операция.
 * */
export const createRandomOperation = (createdAt: string): Operation => {

  const categoryNames = ['category1', 'category2', 'category3'];

  const categoryName = categoryNames[Math.floor(Math.random() * categoryNames.length)];

  const randomCategory: Category = {
    id: Math.random().toString(),
    name: categoryName,
    photo: `https://example.com/${categoryName}.jpg`,
  };

  // Сумма от 0 до 10000
  const amount = Math.floor(Math.random() * 10000);

  // Вероятность 50% на доход или трату
  const isProfit = Math.random() > 0.5;

  return {
    id: Math.random().toString(),
    name: isProfit ? 'Profit' : 'Cost',
    createdAt: createdAt,
    amount: amount,
    category: randomCategory,
    type: isProfit ? 'Profit' : 'Cost',
    desc: Math.random() > 0.5 ? 'Recurring transaction' : undefined, // Описание с вероятностью 50%
  };
};
