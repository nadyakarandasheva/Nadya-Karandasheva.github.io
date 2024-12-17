/**
 * Интерфейс координат.
 * @prop {number} x - Значение x.
 * @prop {number} y - Значение y.
 */
interface ICoordinate {
  x: number,
  y: number
}

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
 * @param {string | number} value - Значение, которое нужно отформатировать. 
 * @param {string | undefined} separator - Разделитель.
 * @returns {string} - Строчка с разделителем.
 */
export const getBeautifulNumber = (value: string | number, separator: string = ' '): string =>
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
 * @returns {ICoordinate} - Координаты.
 */
export const getTransformFromCss = (transformCssString: string): ICoordinate => {
  const data = transformCssString.match(transformRegexp);
  if (!data) return { x: 0, y: 0 };
  return {
    x: parseInt(data[6], 10),
    y: parseInt(data[8], 10),
  };
};

/**
 * Получает значение контраста.
 * @param {[number, number, number]} [red, green, blue] - Кодировка цвета.
 * @returns {number} - Контраст.
 */
export const getColorContrastValue = ([red, green, blue]: [number, number, number]): number =>
  // http://www.w3.org/TR/AERT#color-contrast
  Math.round((red * 299 + green * 587 + blue * 114) / 1000);

/**
 * Тип контраста.
 */
type ContrastType = "black" | "white"

/**
 * Получает тип контраста.
 * @param {number} contrastValue - Значение контраста.
 * @returns {string} - Тип контраста.
 */
export const getContrastType = (contrastValue: number): ContrastType => (contrastValue > 125 ? 'black' : 'white');

/** Короткая версия кодировки цвета. */
export const shortColorRegExp = /^#[0-9a-f]{3}$/i;

/** Полная версия кодировки цвета. */
export const longColorRegExp = /^#[0-9a-f]{6}$/i;

/**
 * Проверяет цвет.
 * @param {string} color - цвет.
 * @returns {void | never}.
 */
export const checkColor = (color: string): void | never => {
  if (!longColorRegExp.test(color) && !shortColorRegExp.test(color)) throw new Error(`invalid hex color: ${color}`);
};

/**
 * Конвертирует цвет из HEX в RGB.
 * @param {string} color - цвет в кодировке HEX.
 * @returns {[number, number, number]} - Цвет в кодировке RGB.
 */
export const hex2rgb = (color: string): [number, number, number] => {
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
 * Интерфейс объекта пронумерованного массива.
 * @prop {number} value - Значение.
 * @prop {number} number - Число.
 */
interface INumberedArrayObject {
  value: number,
  number: number
}

/**
 * Возвращает пронумерованный массив.
 * @param {number[]} arr - Массив.
 * @returns {INumberedArrayObject[]} - Пронумерованный массив.
 */
export const getNumberedArray = (arr: number[]): INumberedArrayObject[] => arr.map((value, number) => ({ value, number }));

/**
 * Возвращает массив значений приведенных к строчке.
 * @param arr - Массив объектов.
 * @param key1 - Первый ключ для формирования строки.
 * @param key2 - Второй ключ для формирования строки.
 * @returns {string[]} - Массив значений приведенных к строчке.
 */
export const toStringArray = <T extends Record<string, any>>(
  arr: T[],
  key1: keyof T,
  key2: keyof T
) => arr.map((item) => `${item[key1]}_${item[key2]}`);

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
