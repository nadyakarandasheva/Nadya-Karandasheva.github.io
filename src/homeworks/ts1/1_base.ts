/**
 * Удаляет знак плюса.
 * @param {string} value - Текст, где необходимо удалить знак плюса. 
 * @returns {string} - Текст без знака плюс. 
 */
export const removePlus = (value: string): string => value.replace(/^\+/, '');

/**
 * Добавляет знак плюса.
 * @param {string} value - Текст, где необходимо добавить знак плюса. 
 * @returns {string} - Текст со знаком плюс. 
 */
export const addPlus = (value: string): string => `+${value}`;

/**
 * Удаляет нули вначале строчки.
 * @param {string} value - Текст, где необходимо удалить нули. 
 * @returns {string} - Текст без нулей вначале. 
 */
export const removeFirstZeros = (value: string): string => value.replace(/^(-)?[0]+(-?\d+.*)$/, '$1$2');

/**
 * Форматирует строку числа, добавляя разделитель.
 * @param {string} value - Строка, представляющая число, которое нужно отформатировать. 
 * @param {string | undefined} separator - Разделитель.
 * @returns {string} - Строчка с разделителем.
 */
export const getBeautifulNumber = (value: string, separator: string = ' '): string =>
  value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);

/**
 * Округляет числа до заданной точности по числу знаков после запятой.
 * @param {number} value - Число, которое нужно округлить.
 * @param {number | undefined} accuracy - Точность.
 * @returns {number} - Округленное число.
 */
export const round = (value: number, accuracy = 2): number => {
  const d = 10 ** accuracy;
  return Math.round(value * d) / d;
};

/** Регулярное выражение для преобразования. */
const transformRegexp =
  /(matrix\(-?\d+(\.\d+)?, -?\d+(\.\d+)?, -?\d+(\.\d+)?, -?\d+(\.\d+)?, )(-?\d+(\.\d+)?), (-?\d+(\.\d+)?)\)/;

/**
 * Извлекает координаты x и y из CSS-строки, описывающей преобразование transform.
 * @param {string} transformCssString - CSS-строка, описывающая преобразование transform.
 * @returns {x: number, y: number} - Координаты.
 */
export const getTransformFromCss = (transformCssString: string): { x: number, y: number } => {
  const data = transformCssString.match(transformRegexp);
  if (!data) return { x: 0, y: 0 };
  return {
    x: parseInt(data[6], 10),
    y: parseInt(data[8], 10),
  };
};

/**
 * Получает значение контраста.
 * @param {number[]} [red, green, blue] - Кодировка цвета.
 * @returns {number} - Контраст.
 */
export const getColorContrastValue = ([red, green, blue]: number[]): number =>
  // http://www.w3.org/TR/AERT#color-contrast
  Math.round((red * 299 + green * 587 + blue * 114) / 1000);

/**
 * Получает тип контраста.
 * @param {number} contrastValue - Значение контраста.
 * @returns {string} - Тип контраста.
 */
export const getContrastType = (contrastValue: number): string => (contrastValue > 125 ? 'black' : 'white');

/** Короткая версия кодировки цвета. */
export const shortColorRegExp = /^#[0-9a-f]{3}$/i;

/** Полная версия кодировки цвета. */
export const longColorRegExp = /^#[0-9a-f]{6}$/i;

/**
 * Проверяет цвет.
 * @param {string} color - цвет.
 * @returns void.
 */
export const checkColor = (color: string): void => {
  if (!longColorRegExp.test(color) && !shortColorRegExp.test(color)) throw new Error(`invalid hex color: ${color}`);
};

/**
 * Конвертирует цвет из HEX в RGB.
 * @param {string} color - цвет в кодировке HEX.
 * @returns {number[]} - Цвет в кодировке RGB.
 */
export const hex2rgb = (color: string): number[] => {
  checkColor(color);
  if (shortColorRegExp.test(color)) {
    const red = parseInt(color.substring(1, 2), 16);
    const green = parseInt(color.substring(2, 3), 16);
    const blue = parseInt(color.substring(3, 4), 16);
    return [red, green, blue];
  }
  const red = parseInt(color.substring(1, 3), 16);
  const green = parseInt(color.substring(3, 5), 16);
  const blue = parseInt(color.substring(5, 8), 16);
  return [red, green, blue];
};

/**
 * Возвращает пронумерованный массив.
 * @param {number[]} arr - Массив.
 * @returns {{ value: number, number: number }[]} - Пронумерованный массив.
 */
export const getNumberedArray = (arr: number[]): { value: number, number: number }[] => arr.map((value, number) => ({ value, number }));

/**
 * Возвращает массив значений приведенных к строчке.
 * @param {{ value: number, number: number }[]} arr - Массив.
 * @returns {string[]} - Массив значений приведенных к строчке.
 */
export const toStringArray = (arr: { value: number, number: number }[]): string[] => arr.map(({ value, number }) => `${value}_${number}`);

/**
 * Интерфейс клиента.
 * @prop {string} id - Идентификатор.
 * @prop {string} name - Имя.
 * @prop {number} age - Возраст.
 * @prop {boolean} isSubscribed - Есть ли подписка?
 */
interface Customer {
  id: string;
  name: string;
  age: number;
  isSubscribed: boolean;
}

/**
 * Интерфейс измененного клиента.
 */
interface TransformedCustomers {
  [key: string]: {
    name: string;
    age: number;
    isSubscribed: boolean;
  };
}

/**
 * Изменение клиента.
 * @param {Customer[]} customers -  клиенты. 
 * @returns 
 */
export const transformCustomers = (customers: Customer[]): TransformedCustomers => {
  return customers.reduce((acc: TransformedCustomers, customer) => {
    acc[customer.id] = { name: customer.name, age: customer.age, isSubscribed: customer.isSubscribed };
    return acc;
  }, {});
};
